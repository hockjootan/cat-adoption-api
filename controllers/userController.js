const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

exports.signup = async (req, res) => {
  const { password, email, name } = req.body;

  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email(),
    password: Joi.string().min(8).required(),
  });

  const { error } = schema.validate({
    name,
    email,
    password,
  });

  if (error) {
    res.status(400).send(error.details[0].message);
  }

  try {
    // Check if the phone number already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).send("A user with this email already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      password: hashedPassword,
      email,
      name,
    });

    res
      .status(201)
      .json({ message: "User created successfully", userId: user.id });
  } catch (error) {
    res.status(500).send("Server error: " + error.message);
  }
};

exports.login = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send("Authentication failed");
    }

    // Access token
    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    // Refresh token
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );
    user.refreshToken = refreshToken;
    user.refreshTokenExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
    await user.save();

    res.json({ message: "Logged in successfully", accessToken, refreshToken });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).send("Refresh Token is required");
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findOne({
      where: { id: decoded.id, refreshToken },
    });

    if (!user) {
      return res.status(401).send("Refresh token is invalid");
    }

    // Verify if token has expired
    if (user.refreshTokenExpires < new Date()) {
      return res.status(401).send("Refresh token has expired");
    }

    // Issue a new access token
    const newAccessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

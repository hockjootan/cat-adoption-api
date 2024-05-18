const jwt = require("jsonwebtoken");
const User = require("../models/user");

const adminMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Assuming Bearer token
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    if (user.role !== "admin") {
      // Assuming 'role' field indicates if a user is an admin
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }

    req.user = user; // Attach the user object to the request
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to authenticate token", error: error.message });
  }
};

module.exports = adminMiddleware;

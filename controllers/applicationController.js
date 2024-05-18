const { Application, User, Cat } = require("../models");

const createApplication = async (req, res) => {
  try {
    const { userId, catId, message } = req.body;
    const newApplication = await Application.create({
      userId,
      catId,
      message,
      status: "pending",
    });
    res.status(201).json(newApplication);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.findAll({ include: [User, Cat] });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findByPk(req.params.id, {
      include: [User, Cat],
    });
    if (application) {
      res.status(200).json(application);
    } else {
      res.status(404).json({ message: "Application not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const [updated] = await Application.update(
      { status },
      { where: { id: req.params.id } }
    );
    if (updated) {
      const updatedApplication = await Application.findByPk(req.params.id);
      res.status(200).json(updatedApplication);
    } else {
      res.status(404).json({ message: "Application not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getApplicationsByUser = async (req, res) => {
  try {
    const applications = await Application.findAll({
      where: { userId: req.params.userId },
      include: [Cat],
    });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createApplication,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
  getApplicationsByUser,
};

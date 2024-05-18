const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");
const adminMiddleware = require("../middleware/adminMiddleware");

router.post("/", applicationController.createApplication);
router.get("/", adminMiddleware, applicationController.getAllApplications);
router.get("/:id", adminMiddleware, applicationController.getApplicationById);
router.put(
  "/:id",
  adminMiddleware,
  applicationController.updateApplicationStatus
);
router.get("/user/:userId", applicationController.getApplicationsByUser);

module.exports = router;

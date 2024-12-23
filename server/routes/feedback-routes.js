const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedback-controller");

// Routes
router.post("/feedback/add", feedbackController.addFeedback);
router.put("/feedback/update/:id", feedbackController.updateFeedback);
router.get("/feedback/view/:id", feedbackController.getFeedbackById);
router.get("/feedback/viewAll", feedbackController.getAllFeedbacks);

module.exports = router;

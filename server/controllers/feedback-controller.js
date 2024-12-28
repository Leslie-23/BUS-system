const Feedback = require("../models/feedback");
const Bus = require("../models/bus");

// Add feedback for a specific bus
exports.addFeedback = async (req, res) => {
  try {
    const { busId, userId, rating, comments } = req.body;

    // Ensure the bus exists
    const bus = await Bus.findById(busId);
    if (!bus) return res.status(404).json({ message: "Bus not found" });

    const newFeedback = new Feedback({ busId, userId, rating, comments });
    await newFeedback.save();
    res
      .status(201)
      .json({ message: "Feedback added successfully", feedback: newFeedback });
  } catch (error) {
    res.status(400).json({
      message: "Error adding feedback",
      error: error.message,
      stack: error.stack,
    });
  }
};

// Update feedback
exports.updateFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedFeedback = await Feedback.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedFeedback)
      return res.status(404).json({ message: "Feedback not found" });

    res.status(200).json({
      message: "Feedback updated successfully",
      feedback: updatedFeedback,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating feedback", error: error.message });
  }
};

// Get a specific feedback by ID
exports.getFeedbackById = async (req, res) => {
  try {
    const { id } = req.params;

    const feedback = await Feedback.findById(id);
    if (!feedback)
      return res.status(404).json({ message: "Feedback not found" });

    res
      .status(200)
      .json({ message: "Feedback fetched successfully", feedback });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching feedback", error: error.message });
  }
};

// Get all feedbacks
exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate("busId", "name");
    res
      .status(200)
      .json({ message: "Feedbacks fetched successfully", feedbacks });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching feedbacks", error: error.message });
  }
};

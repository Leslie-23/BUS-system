const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    busId: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    busId: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);

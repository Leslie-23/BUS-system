const mongoose = require("mongoose");

const busSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    busType: {
      type: String,
      enum: ["AC", "Non-AC", "Luxury", "Sleeper"],
      required: true,
    },
    capacity: { type: Number, required: true },
    registrationNumber: { type: String, required: true, unique: true },
    routes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Route" }],
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bus", busSchema);

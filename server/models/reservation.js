const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    busId: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
    routeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Route",
      required: true,
    },
    date: { type: Date, required: true },
    seatNumber: { type: Number, required: true },
    status: { type: String, enum: ["Booked", "Cancelled"], default: "Booked" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reservation", reservationSchema);

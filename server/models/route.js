// const mongoose = require("mongoose");

// const routeSchema = new mongoose.Schema(
//   {
//     startLocation: { type: String, required: true },
//     endLocation: { type: String, required: true },
//     distance: { type: Number, required: true }, // In kilometers
//     estimatedTime: { type: String, required: true }, // e.g., "2h 30m"
//     buses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bus" }],
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Route", routeSchema);

const mongoose = require("mongoose");

const stopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true }, // Optional: Could include coordinates or addresses
  stopId: {
    type: mongoose.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
});

const routeSchema = new mongoose.Schema({
  routeName: { type: String, required: true },
  stops: {
    type: [stopSchema],
    validate: {
      validator: function (stops) {
        return stops.length >= 2; // Minimum of two stops
      },
      message: "A route must have at least two stops.",
    },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Route", routeSchema);

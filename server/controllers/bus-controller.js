const Bus = require("../models/bus");
const upload = require("../utils/uploads");

// Add a new bus
exports.addBus = async (req, res) => {
  try {
    const { name, busType, capacity, registrationNumber, isActive } = req.body;
    const imagePath = req.file ? req.file.path : null;
    const newBus = new Bus({
      name,
      busType,
      capacity,
      registrationNumber,
      isActive,
      image: imagePath,
    });
    await newBus.save();
    res.status(201).json({ message: "Bus added successfully", bus: newBus });
  } catch (error) {
    res.status(400).json({
      message: "Error adding bus",
      error: error.message,
      stack: error.stack,
    });
  }
};

// Update a bus
exports.updateBus = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedBus = await Bus.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedBus) return res.status(404).json({ message: "Bus not found" });
    res
      .status(200)
      .json({ message: "Bus updated successfully", bus: updatedBus });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating bus", error: error.message });
  }
};

// View all buses
exports.viewAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    res.status(200).json({ message: "Buses fetched successfully", buses });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching buses", error: error.message });
  }
};

// Delete a bus by ID
exports.deleteBusById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBus = await Bus.findByIdAndDelete(id);
    if (!deletedBus) return res.status(404).json({ message: "Bus not found" });
    res
      .status(200)
      .json({ message: "Bus deleted successfully", bus: deletedBus });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting bus", error: error.message });
  }
};

// Get a bus by ID
exports.getBusById = async (req, res) => {
  try {
    const { id } = req.params;
    const bus = await Bus.findById(id);
    if (!bus) return res.status(404).json({ message: "Bus not found" });
    res.status(200).json({ message: "Bus fetched successfully", bus });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching bus", error: error.message });
  }
};

// Get buses by type
exports.getBusesByType = async (req, res) => {
  try {
    const { type } = req.params; // Destructure 'type' from request parameters
    console.log("Request Parameters:", req.params);

    // Query the database for matching bus types
    const buses = await Bus.find({
      busType: { $regex: new RegExp(`^${type}$`, "i") }, // Case-insensitive search
    });

    console.log("Matching Buses:", buses);

    if (!buses.length) {
      return res.status(404).json({
        message: "No buses of this type found",
      });
    }

    res.status(200).json({
      message: "Buses fetched successfully",
      buses,
    });
  } catch (error) {
    console.error("Error fetching buses:", error);
    res.status(500).json({
      message: "Error fetching buses",
      error: error.message,
    });
  }
};
// exports.getBusesByType = async (req, res) => {
//   try {
//     const { busType } = req.params; // Get busType from path parameters
//     console.log(req.params);
//     const buses = await Bus.find({
//       busType: { $regex: new RegExp(`^${busType}$`, "i") },
//     });
//     console.log("Bus Type Requested:", { busType }); // Log incoming busType
//     if (!buses)
//       return res.status(404).json({
//         message: "No buses of this type found",
//         // error: error.message,
//         // stack: error.stack,
//       });
//     res.status(200).json({
//       message: "Buses fetched successfully",
//       buses,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error fetching buses",
//       error: error.message,
//     });
//   }
// };

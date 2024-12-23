const Reservation = require("../models/reservation");
const Bus = require("../models/bus");

// Add a new reservation
exports.addReservation = async (req, res) => {
  try {
    const { busId, user, seats, reservationDate } = req.body;

    // Ensure the bus exists
    const bus = await Bus.findById(busId);
    if (!bus) return res.status(404).json({ message: "Bus not found" });

    const newReservation = new Reservation({
      busId,
      user,
      seats,
      reservationDate,
    });
    await newReservation.save();
    res
      .status(201)
      .json({
        message: "Reservation created successfully",
        reservation: newReservation,
      });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating reservation", error: error.message });
  }
};

// Update a reservation
exports.updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedReservation = await Reservation.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    );
    if (!updatedReservation)
      return res.status(404).json({ message: "Reservation not found" });

    res
      .status(200)
      .json({
        message: "Reservation updated successfully",
        reservation: updatedReservation,
      });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating reservation", error: error.message });
  }
};

// Delete a reservation
exports.deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedReservation = await Reservation.findByIdAndDelete(id);
    if (!deletedReservation)
      return res.status(404).json({ message: "Reservation not found" });

    res
      .status(200)
      .json({
        message: "Reservation deleted successfully",
        reservation: deletedReservation,
      });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting reservation", error: error.message });
  }
};

// Get a specific reservation by ID
exports.getReservationById = async (req, res) => {
  try {
    const { id } = req.params;

    const reservation = await Reservation.findById(id);
    if (!reservation)
      return res.status(404).json({ message: "Reservation not found" });

    res
      .status(200)
      .json({ message: "Reservation fetched successfully", reservation });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching reservation", error: error.message });
  }
};

// Get all reservations
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res
      .status(200)
      .json({ message: "Reservations fetched successfully", reservations });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching reservations", error: error.message });
  }
};

// Get reservations by date
exports.getReservationsByDate = async (req, res) => {
  try {
    const { date } = req.query;

    const reservations = await Reservation.find({
      reservationDate: new Date(date),
    });
    res
      .status(200)
      .json({ message: "Reservations fetched successfully", reservations });
  } catch (error) {
    res
      .status(400)
      .json({
        message: "Error fetching reservations by date",
        error: error.message,
      });
  }
};

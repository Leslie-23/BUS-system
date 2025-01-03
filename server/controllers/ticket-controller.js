const Ticket = require("../models/Ticket");

// Create a ticket
exports.createTicket = async (req, res) => {
  try {
    const { user, bus, seatNumber, price } = req.body;
    const ticket = new Ticket({ user, bus, seatNumber, price });
    await ticket.save();
    res.status(201).json({ success: true, ticket });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all tickets
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate("user bus");
    res.status(200).json({ success: true, tickets });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a specific ticket
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate("user bus");
    if (!ticket) {
      return res
        .status(404)
        .json({ success: false, message: "Ticket not found" });
    }
    res.status(200).json({ success: true, ticket });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Revoke a ticket
exports.revokeTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res
        .status(404)
        .json({ success: false, message: "Ticket not found" });
    }
    ticket.status = "revoked";
    await ticket.save();
    res.status(200).json({ success: true, message: "Ticket revoked", ticket });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

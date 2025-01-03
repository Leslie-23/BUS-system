const express = require("express");
const {
  createTicket,
  getAllTickets,
  getTicketById,
  revokeTicket,
} = require("../controllers/ticketController");

const router = express.Router();

// Routes
router.post("/tickets", createTicket); // Create a ticket
router.get("/tickets", getAllTickets); // View all tickets
router.get("/tickets/:id", getTicketById); // View a specific ticket
router.put("/tickets/:id/revoke", revokeTicket); // Revoke a ticket

module.exports = router;

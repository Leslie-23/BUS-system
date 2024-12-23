const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservation-controller");

// Routes
router.post("/reservation/add", reservationController.addReservation);
router.put("/reservation/update/:id", reservationController.updateReservation);
router.delete(
  "/reservation/delete/:id",
  reservationController.deleteReservation
);
router.get("/reservation/view/:id", reservationController.getReservationById);
router.get("/reservation/viewAll", reservationController.getAllReservations);
router.get(
  "/reservation/viewByDate",
  reservationController.getReservationsByDate
);

module.exports = router;

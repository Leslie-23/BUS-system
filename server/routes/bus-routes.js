const express = require("express");
const router = express.Router();
const busController = require("../controllers/bus-controller");

// Routes
router.post("/bus/add", busController.addBus);
router.put("/bus/update/:id", busController.updateBus);
router.get("/bus/viewAll", busController.viewAllBuses);
router.delete("/bus/delete/:id", busController.deleteBusById);
router.get("/bus/view/:id", busController.getBusById);
router.get("/bus/viewBusType/:type", busController.getBusesByType);

module.exports = router;

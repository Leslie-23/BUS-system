const express = require("express");
const router = express.Router();
const routeController = require("../controllers/route-controller");

// Routes
router.post("/route/add", routeController.addRoute);
router.put("/route/update/:id", routeController.updateRoute);
router.delete("/route/delete/:id", routeController.deleteRouteById);
router.get("/route/view/:id", routeController.getRouteById);
router.get("/route/viewAll", routeController.getAllRoutes);
router.put("/route/updateStop/:routeId/:stopId", routeController.updateStop);

module.exports = router;

const Route = require("../models/Route");

// Add a new route
exports.addRoute = async (req, res) => {
  try {
    const { routeName, stops } = req.body;

    if (!Array.isArray(stops) || stops.length < 2) {
      return res
        .status(400)
        .json({ message: "A route must have at least two stops." });
    }

    const newRoute = new Route({ routeName, stops });
    await newRoute.save();
    res
      .status(201)
      .json({ message: "Route added successfully", route: newRoute });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error adding route", error: error.message });
  }
};

// Update a route
exports.updateRoute = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedRoute = await Route.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedRoute)
      return res.status(404).json({ message: "Route not found" });

    res
      .status(200)
      .json({ message: "Route updated successfully", route: updatedRoute });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating route", error: error.message });
  }
};

// Delete a route by ID
exports.deleteRouteById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRoute = await Route.findByIdAndDelete(id);
    if (!deletedRoute)
      return res.status(404).json({ message: "Route not found" });

    res
      .status(200)
      .json({ message: "Route deleted successfully", route: deletedRoute });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting route", error: error.message });
  }
};

// Get a route by ID
exports.getRouteById = async (req, res) => {
  try {
    const { id } = req.params;

    const route = await Route.findById(id);
    if (!route) return res.status(404).json({ message: "Route not found" });

    res.status(200).json({ message: "Route fetched successfully", route });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching route", error: error.message });
  }
};

// Get all routes
exports.getAllRoutes = async (req, res) => {
  try {
    const routes = await Route.find();
    res.status(200).json({ message: "Routes fetched successfully", routes });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching routes", error: error.message });
  }
};

// Update a stop within a route
exports.updateStop = async (req, res) => {
  try {
    const { routeId, stopId } = req.params;
    const { name, location } = req.body;

    const route = await Route.findById(routeId);
    if (!route) return res.status(404).json({ message: "Route not found" });

    const stop = route.stops.id(stopId);
    if (!stop) return res.status(404).json({ message: "Stop not found" });

    if (name) stop.name = name;
    if (location) stop.location = location;

    route.updatedAt = Date.now();
    await route.save();

    res.status(200).json({ message: "Stop updated successfully", stop });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating stop", error: error.message });
  }
};

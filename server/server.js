require("dotenv").config(); // Load environment variables
const express = require("express");
const connectDB = require("./config/database");
const adminRoutes = require("./routes/admin-routes");
const userRoutes = require("./routes/user-routes");
const userAdminRoutes = require("./routes/user-routes");
const busRoutes = require("./routes/bus-routes");
const routeRoutes = require("./routes/route-routes");
const reservationRoutes = require("./routes/reservation-routes");
const feedbackRoutes = require("./routes/feedback-routes");
const uploadRouter = require("./routes/upload-routes");
const cors = require("cors");

const app = express();

// Use CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Allow only this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

app.options("*", cors());

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // To parse JSON bodies

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/users", userAdminRoutes);
app.use("/api", busRoutes);
app.use("/api", routeRoutes);
app.use("/api", reservationRoutes);
app.use("/api", feedbackRoutes);

// static route for file upload
app.use("/uploads", uploadRouter);
app.use("/uploads", express.static("uploads"));

// Home Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

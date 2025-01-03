import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    console.log("user logged out--");
  };
  const handleViewProfile = () => {
    navigate("/profile");
  };
  const handleUpdateProfile = () => {
    navigate("/update-profile");
  };
  const handleDeleteProfile = () => {
    navigate("/delete-profile");
  };
  const handleViewAllRoutes = () => {
    navigate("/view-all-routes");
  };
  const handleAddReservation = () => {
    navigate("/add-reservation");
  };
  const handleViewAllReservation = () => {
    navigate("/view-all-reservations");
  };
  const handleViewReservationById = () => {
    navigate("/view-reservations-by-id");
  };
  const handleDeleteReservationById = () => {
    navigate("/delete-reservation-by-id");
  };
  const handleAddFeedback = () => {
    navigate("/add-feedback");
  };
  const handleUpdateFeedback = () => {
    navigate("/update-feedback");
  };
  const handleViewFeedback = () => {
    navigate("/view-feedback");
  };
  const handleBuyTicket = () => {
    navigate("/buy-ticket");
  };

  return (
    <Box sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h4" color="primary">
        Welcome to the Dashboard
      </Typography>
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleLogout}>
        Logout
      </Button>
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        color="primary"
        onClick={handleViewProfile}
      >
        View Profile
      </Button>
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        color="primary"
        onClick={handleUpdateProfile}
      >
        Update Profile
      </Button>
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        color="primary"
        onClick={handleDeleteProfile}
      >
        Delete Profile
      </Button>
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        color="primary"
        onClick={handleViewAllRoutes}
      >
        View Routes
      </Button>
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        color="primary"
        onClick={handleAddReservation}
      >
        Add Reservation
      </Button>
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        color="primary"
        onClick={handleViewAllReservation}
      >
        View All Reservation
      </Button>
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        color="primary"
        onClick={handleViewReservationById}
      >
        View Reservation By Id
      </Button>
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        color="primary"
        onClick={handleDeleteReservationById}
      >
        Delete Reservation
      </Button>
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        color="primary"
        onClick={handleAddFeedback}
      >
        Add Feedback
      </Button>
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        color="primary"
        onClick={handleUpdateFeedback}
      >
        Update Feedback
      </Button>
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        color="primary"
        onClick={handleViewFeedback}
      >
        View Feedback
      </Button>
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        color="primary"
        onClick={handleBuyTicket}
      >
        Buy Ticket
      </Button>
    </Box>
  );
};

export default Dashboard;

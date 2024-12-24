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
    </Box>
  );
};

export default Dashboard;

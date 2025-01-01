import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

const AddReservation = () => {
  const [formData, setFormData] = useState({
    userId: "",
    busId: "",
    routeId: "",
    date: "",
    seatNumber: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.post(
        `http://localhost:5000/api/add/reservation/${userId}`,
        formData
      );
      setSnackbar({
        open: true,
        message: "Reservation added successfully!",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Error adding reservation",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 500,
        margin: "0 auto",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
        Add Reservation
      </Typography>
      {["userId", "busId", "routeId", "date", "seatNumber"].map((field) => (
        <TextField
          key={field}
          label={field.charAt(0).toUpperCase() + field.slice(1)}
          name={field}
          type={
            field === "seatNumber"
              ? "number"
              : field === "date"
              ? "date"
              : "text"
          }
          value={formData[field]}
          onChange={handleChange}
          fullWidth
          required
          InputLabelProps={field === "date" ? { shrink: true } : {}}
        />
      ))}
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Add Reservation
      </Button>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddReservation;

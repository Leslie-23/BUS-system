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

const DeleteReservation = () => {
  const [reservationId, setReservationId] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    setReservationId(e.target.value);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`/api/reservations/${reservationId}`);
      setSnackbar({
        open: true,
        message: "Reservation deleted successfully!",
        severity: "success",
      });
      setReservationId("");
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Error deleting reservation",
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
      onSubmit={handleDelete}
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
        Delete Reservation
      </Typography>
      <TextField
        label="Reservation ID"
        name="reservationId"
        value={reservationId}
        onChange={handleChange}
        fullWidth
        required
      />
      <Button type="submit" variant="contained" color="error" fullWidth>
        Delete Reservation
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

export default DeleteReservation;

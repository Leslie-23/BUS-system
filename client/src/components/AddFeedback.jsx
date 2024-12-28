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

const AddFeedback = () => {
  // State management
  const [feedback, setFeedback] = useState({
    busId: "",
    rating: "",
    comment: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Get the user ID from localStorage
  const userId = localStorage.getItem("userId");

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      setSnackbar({
        open: true,
        message: "User ID not found. Please log in.",
        severity: "error",
      });
      return;
    }

    try {
      // Combine userId with feedback object
      const feedbackData = { ...feedback, userId };

      // Send a POST request to create feedback
      await axios.post("http://localhost:5000/api/feedback/add", feedbackData);

      // Show success message and reset form
      setSnackbar({
        open: true,
        message: "Feedback submitted successfully!",
        severity: "success",
      });
      setFeedback({ busId: "", rating: "", comment: "" });
    } catch (error) {
      // Handle errors
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Error submitting feedback",
        severity: "error",
      });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 500, margin: "0 auto", padding: 2 }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Add Feedback
      </Typography>
      <TextField
        label="Bus ID"
        name="busId"
        value={feedback.busId}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Rating (1 to 5)"
        name="rating"
        type="number"
        value={feedback.rating}
        onChange={handleChange}
        fullWidth
        required
        inputProps={{ min: 1, max: 5 }}
      />
      <TextField
        label="Comment (Optional)"
        name="comment"
        value={feedback.comment}
        onChange={handleChange}
        fullWidth
        multiline
        rows={4}
        sx={{ marginTop: 2 }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: 2 }}
      >
        Submit Feedback
      </Button>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddFeedback;

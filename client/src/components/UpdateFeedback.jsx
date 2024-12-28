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
  const [feedback, setFeedback] = useState({ userId: "", message: "" });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/feedback", feedback);
      setSnackbar({
        open: true,
        message: "Feedback submitted successfully!",
        severity: "success",
      });
      setFeedback({ userId: "", message: "" });
    } catch (error) {
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
        label="User ID"
        name="userId"
        value={feedback.userId}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Message"
        name="message"
        value={feedback.message}
        onChange={handleChange}
        fullWidth
        required
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

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

const ViewFeedback = () => {
  const [feedbackId, setFeedbackId] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [feedbackMsg, setFeedbackMsg] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:5000/api/feedback/view/${feedbackId}`
      );
      setFeedback(response.data.feedback);
      setFeedbackMsg(response.data);
      //   console.log(response.data);
      setSnackbar({
        open: true,
        message: "Feedback fetched successfully!",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error fetching feedback",
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
        View Feedback
      </Typography>
      <TextField
        label="Feedback ID"
        name="feedbackId"
        value={feedbackId}
        onChange={(e) => setFeedbackId(e.target.value)}
        fullWidth
        required
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: 2 }}
      >
        Fetch Feedback
      </Button>
      {feedback && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="body1" color="primary">
            {/*Message:*/} {feedbackMsg.message}
          </Typography>
          <Typography variant="body2" color="default">
            User ID: {feedback.userId}
          </Typography>
          <Typography variant="body2" color="default">
            Bus ID {feedback.busId}
          </Typography>
          <Typography variant="body2" color="default">
            Rating: {feedback.rating}
          </Typography>
          <Typography variant="body2" color="default">
            Comment: {feedback.comment}
          </Typography>
        </Box>
      )}
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

export default ViewFeedback;

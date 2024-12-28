import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Alert,
} from "@mui/material";

const ViewAllFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/feedback/viewAll"
        );
        setFeedbacks(response.data);
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Error fetching feedbacks",
          severity: "error",
        });
      }
    };
    fetchFeedbacks();
  }, []);

  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto", padding: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        All Feedbacks
      </Typography>
      <List>
        {feedbacks.map((feedback) => (
          <ListItem key={feedback.id}>
            <ListItemText
              primary={`Message: ${feedback.message}`}
              secondary={`User ID: ${feedback.userId}`}
            />
          </ListItem>
        ))}
      </List>
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

export default ViewAllFeedback;

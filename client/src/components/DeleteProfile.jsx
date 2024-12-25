import React, { useState } from "react";
import {
  Container,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
  CircularProgress,
  Box,
} from "@mui/material";

const DeleteProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:5000/api/user/delete/${userId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error("Failed to delete profile");

      setSuccess("Profile deleted successfully!");
      console.log("Profile deleted");
      // Optionally, redirect to another page after successful deletion
      // e.g., window.location.href = "/login";
    } catch (err) {
      console.error(err);
      setError("Error deleting profile.");
    } finally {
      setLoading(false);
      setOpen(false); // Close the confirmation dialog
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Delete Profile
      </Typography>
      {loading && (
        <Box display="flex" justifyContent="center" sx={{ mb: 2 }}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}
      <Button
        variant="contained"
        color="error"
        fullWidth
        onClick={handleOpenDialog}
        sx={{ mt: 2 }}
      >
        Delete Profile
      </Button>

      {/* Confirmation Dialog */}
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="delete-confirmation-dialog"
      >
        <DialogTitle id="delete-confirmation-dialog">
          Confirm Profile Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your profile? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DeleteProfile;

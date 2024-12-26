import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

const DeleteBus = () => {
  const [busId, setBusId] = useState("");

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/bus/${busId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete bus");
      }

      alert("Bus deleted successfully");
      setBusId("");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Delete Bus
      </Typography>
      <Box sx={{ mt: 2, mb: 2 }}>
        <TextField
          fullWidth
          label="Bus ID"
          variant="outlined"
          value={busId}
          onChange={(e) => setBusId(e.target.value)}
        />
        <Button
          variant="contained"
          color="error"
          sx={{ mt: 2 }}
          onClick={handleDelete}
        >
          Delete Bus
        </Button>
      </Box>
    </Container>
  );
};

export default DeleteBus;

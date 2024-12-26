import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

const UpdateBus = () => {
  const [busId, setBusId] = useState("");
  const [busDetails, setBusDetails] = useState({
    busType: "",
    capacity: "",
    route: "",
  });

  const handleChange = (e) => {
    setBusDetails({ ...busDetails, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/bus/update/${busId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(busDetails),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update bus");
      }

      alert("Bus updated successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom color="primary">
        Update Bus
      </Typography>
      <Box component="form" onSubmit={handleUpdate} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Bus ID"
          variant="outlined"
          value={busId}
          onChange={(e) => setBusId(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          name="busType"
          label="Bus Type"
          variant="outlined"
          value={busDetails.busType}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          name="capacity"
          label="Capacity"
          variant="outlined"
          type="number"
          value={busDetails.capacity}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          name="route"
          label="Route"
          variant="outlined"
          value={busDetails.route}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Update Bus
        </Button>
      </Box>
    </Container>
  );
};

export default UpdateBus;

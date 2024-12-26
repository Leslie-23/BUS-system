import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const AddBus = () => {
  const [busDetails, setBusDetails] = useState({
    name: "",
    busType: "",
    capacity: "",
    registrationNumber: "",
    isActive: true,
    routes: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBusDetails({
      ...busDetails,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/bus/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(busDetails),
      });

      if (!response.ok) {
        throw new Error("Failed to add bus");
      }

      alert("Bus added successfully");
      // Clear form after successful submission
      setBusDetails({
        name: "",
        busType: "",
        capacity: "",
        registrationNumber: "",
        isActive: true,
        routes: [],
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom color="primary">
        Add Bus
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          name="name"
          label="Bus Name"
          variant="outlined"
          value={busDetails.name}
          onChange={handleChange}
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
          name="registrationNumber"
          label="Registration Number"
          variant="outlined"
          value={busDetails.registrationNumber}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="isActive"
              checked={busDetails.isActive}
              color="primary"
              onChange={handleChange}
            />
          }
          //   color="primary"
          label="Is Active (yes or no)"
          sx={{ color: "grey" }}
        />
        <TextField
          fullWidth
          name="routes"
          label="Routes (comma-separated)"
          variant="outlined"
          value={busDetails.routes.join(", ")}
          onChange={(e) =>
            setBusDetails({
              ...busDetails,
              routes: e.target.value.split(",").map((route) => route.trim()),
            })
          }
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Bus
        </Button>
      </Box>
    </Container>
  );
};

export default AddBus;

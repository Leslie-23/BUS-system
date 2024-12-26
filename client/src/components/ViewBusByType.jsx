import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Grid,
} from "@mui/material";

const ViewBusByType = () => {
  const [busType, setBusType] = useState("");
  const [buses, setBuses] = useState([]);

  const handleFetch = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/bus/viewByType/${busType}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch buses by type");
      }
      const data = await response.json();
      setBuses(data.buses);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom color="primary">
        View Buses by Type
      </Typography>
      <Box sx={{ mt: 2, mb: 2 }}>
        <TextField
          fullWidth
          label="Bus Type"
          variant="outlined"
          value={busType}
          onChange={(e) => setBusType(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleFetch}
        >
          Fetch Buses
        </Button>
      </Box>
      <Grid container spacing={2}>
        {buses.length > 0 ? (
          buses.map((bus) => (
            <Grid item xs={12} sm={6} md={4} key={bus._id}>
              <Paper elevation={3} sx={{ padding: "15px" }}>
                <Typography variant="h6">{bus.busType}</Typography>
                <Typography>Capacity: {bus.capacity}</Typography>
                <Typography>Route: {bus.route}</Typography>
              </Paper>
            </Grid>
          ))
        ) : (
          <Typography>No buses found for the selected type.</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default ViewBusByType;

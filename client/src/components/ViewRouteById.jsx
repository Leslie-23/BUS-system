import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import axios from "axios";

const ViewRouteById = () => {
  const [routeId, setRouteId] = useState("");
  const [route, setRoute] = useState(null);

  const handleFetch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/route/view/${routeId}`
      );
      setRoute(response.data.route);
    } catch (error) {
      alert("Route not found");
      console.error(error);
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 500, mx: "auto" }}>
      <Typography variant="h4" gutterBottom color="primary">
        View Route
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        label="Route ID"
        onChange={(e) => setRouteId(e.target.value)}
        required
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleFetch}
        sx={{ mt: 2 }}
      >
        Fetch Route
      </Button>
      {route && (
        <Paper elevation={3} sx={{ mt: 4, p: 2 }}>
          <Typography variant="h6">{route.routeName}</Typography>
          <Typography>
            {route.startLocation} to {route.endLocation}
          </Typography>
          <Typography>Stops: {route.stops.join(", ")}</Typography>
          <Typography>Duration: {route.duration} minutes</Typography>
        </Paper>
      )}
    </Box>
  );
};

export default ViewRouteById;

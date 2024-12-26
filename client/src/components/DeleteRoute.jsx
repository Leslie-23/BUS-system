import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";

const DeleteRoute = () => {
  const [routeId, setRouteId] = useState("");

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/route/delete/${routeId}`);
      alert("Route deleted successfully");
    } catch (error) {
      alert("Failed to delete route");
      console.error(error);
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 500, mx: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Delete Route
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
        color="error"
        fullWidth
        onClick={handleDelete}
        sx={{ mt: 2 }}
      >
        Delete Route
      </Button>
    </Box>
  );
};

export default DeleteRoute;

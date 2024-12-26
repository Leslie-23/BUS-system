import React, { useEffect, useState } from "react";
import { Container, Typography, Paper, Grid } from "@mui/material";

const ViewAllBuses = () => {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/bus/viewAll");
        if (!response.ok) {
          throw new Error("Failed to fetch buses");
        }
        const data = await response.json();
        setBuses(data.buses);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchBuses();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom color="primary">
        All Buses
      </Typography>
      <Grid container spacing={2}>
        {buses.map((bus) => (
          <Grid item xs={12} sm={6} md={4} key={bus._id}>
            <Paper elevation={3} sx={{ padding: "15px" }}>
              <Typography variant="h6" color="primary">
                {bus.name}
              </Typography>
              <Typography sx={{ color: "black" }}>
                Type: {bus.busType}
              </Typography>
              <Typography>Capacity: {bus.capacity}</Typography>
              <Typography>Route: {bus.route}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ViewAllBuses;

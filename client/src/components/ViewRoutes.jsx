import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Box,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

const ViewRoutes = () => {
  const [routes, setRoutes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoutes = async () => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          "http://localhost:5000/api/route/viewAll",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch routes");
        }

        const data = await response.json();
        setRoutes(data.routes);
      } catch (err) {
        console.error(err);
        setError("Error fetching routes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  const filteredRoutes = routes.filter((route) =>
    route.routeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f9f9f9", // Page background
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        View Routes
      </Typography>

      {/* Search Field */}
      <TextField
        label="Search Routes"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        // sx={{ mb: 3 }}
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backgroundColor: "#fff",
          padding: "10px",
          borderBottom: "1px solid #ddd",
        }}
      />

      {loading && (
        <Box display="flex" justifyContent="center" sx={{ my: 3 }}>
          <CircularProgress />
        </Box>
      )}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Route List */}
      {!loading && !error && filteredRoutes.length === 0 && (
        <Alert severity="info">No routes found.</Alert>
      )}

      <List>
        {filteredRoutes.map((route) => (
          <Box key={route._id} color="default">
            <ListItem>
              <ListItemText
                primary={
                  <Typography color="primary">
                    {`Route Name: ${route.routeName}`}
                  </Typography>
                }
                secondary={`Stops: ${route.stops
                  .map((stop) => `${stop.name} (${stop.location})`)
                  .join(", ")}`}
              />
            </ListItem>
            <Divider />
          </Box>
        ))}
      </List>
    </Container>
  );
};

export default ViewRoutes;

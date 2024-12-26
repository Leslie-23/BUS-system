import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import axios from "axios";

const ViewAllRoutes = () => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get("/api/route/viewAll");
        setRoutes(response.data.routes);
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };

    fetchRoutes();
  }, []);

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
      <Typography variant="h4" gutterBottom>
        All Routes
      </Typography>
      <Paper elevation={3}>
        <List>
          {routes.map((route) => (
            <ListItem key={route._id}>
              <ListItemText
                primary={route.name}
                secondary={`${route.startLocation} to ${route.endLocation}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default ViewAllRoutes;

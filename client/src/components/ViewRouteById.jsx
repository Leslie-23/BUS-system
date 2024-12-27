import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";

const ViewRouteById = () => {
  const [routeId, setRouteId] = useState("");
  const [routeData, setRouteData] = useState({
    name: "",
    startLocation: "",
    endLocation: "",
    stops: [],
    distance: "",
    estimatedTime: "",
  });

  const [error, setError] = useState("");

  // Function to fetch route data by the provided routeId
  const fetchRouteData = async () => {
    if (!routeId) {
      setError("Please enter a valid Route ID.");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:5000/api/route/view/${routeId}`
      );
      setRouteData(response.data);
      console.log(response.data);
      console.log(response.data.stops);
      setError(""); // Reset error if data is fetched successfully
    } catch (error) {
      setError("Error fetching route data. Please try again.");
      console.error("Error fetching route data:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchRouteData();
  };

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h4" gutterBottom color="primary">
        View Route by ID
      </Typography>

      {/* Input Field to take Route ID */}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Enter Route ID"
          value={routeId}
          onChange={(e) => setRouteId(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          View Route
        </Button>
      </form>

      {/* Error Message */}
      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {/* Display Route Details */}

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" color="primary">
          Route Name:{" "}
          {routeData.routeName ||
            {
              /*routeData.route.routeName*/
            }}
        </Typography>
        <Typography variant="body1">
          Start Location: {routeData.startLocation}
        </Typography>
        <Typography variant="body1">
          End Location: {routeData.endLocation}
        </Typography>
        <Typography variant="body1">
          Distance: {routeData.distance} km
        </Typography>
        <Typography variant="body1">
          Estimated Time: {routeData.estimatedTime} hours
        </Typography>

        {/* Display Stops */}
        <Typography variant="h6" sx={{ mt: 2 }} color="primary">
          Stops:
        </Typography>
        {Array.isArray(routeData.stops) && routeData.stops.length > 0 ? (
          <List>
            {routeData.stops.map((stop, index) => {
              // Debug log for each stop
              console.log(`Stop ${index + 1}:`, stop);

              return (
                <ListItem key={index}>
                  <ListItemText
                    primary={`Stop ${index + 1}: ${stop.name}`}
                    secondary={`Location: ${stop.location}`}
                  />
                </ListItem>
              );
            })}
          </List>
        ) : (
          <Typography>No stops available</Typography>
        )}
        {/* {routeData.stops && routeData.stops.length > 0 ? (
          <List>
            {routeData.stops.map((stop, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`Stop ${index + 1}: ${stop.stopName}`}
                  secondary={`Location: ${stop.stopLocation}`}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No stops available</Typography>
        )} */}
      </Box>
    </Box>
  );
};

export default ViewRouteById;

// import React, { useState } from "react";
// import { Box, TextField, Button, Typography, Paper } from "@mui/material";
// import axios from "axios";

// const ViewRouteById = () => {
//   const [routeId, setRouteId] = useState("");
//   const [route, setRoute] = useState(null);

//   const handleFetch = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/route/view/${routeId}`
//       );
//       setRoute(response.data.route);
//     } catch (error) {
//       alert("Route not found");
//       console.error(error);
//     }
//   };

//   return (
//     <Box sx={{ p: 4, maxWidth: 500, mx: "auto" }}>
//       <Typography variant="h4" gutterBottom color="primary">
//         View Route
//       </Typography>
//       <TextField
//         fullWidth
//         margin="normal"
//         label="Route ID"
//         onChange={(e) => setRouteId(e.target.value)}
//         required
//       />
//       <Button
//         variant="contained"
//         color="primary"
//         fullWidth
//         onClick={handleFetch}
//         sx={{ mt: 2 }}
//       >
//         Fetch Route
//       </Button>
//       {route && (
//         <Paper elevation={3} sx={{ mt: 4, p: 2 }}>
//           <Typography variant="h6">{route.routeName}</Typography>
//           <Typography>
//             {route.startLocation} to {route.endLocation}
//           </Typography>
//           <Typography>Stops: {route.stops.join(", ")}</Typography>
//           <Typography>Duration: {route.duration} minutes</Typography>
//         </Paper>
//       )}
//     </Box>
//   );
// };

// export default ViewRouteById;

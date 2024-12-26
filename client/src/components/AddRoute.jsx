import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import axios from "axios";

const AddRoute = () => {
  const [routeData, setRouteData] = useState({
    routeName: "",
    stops: [
      { name: "", location: "" }, // Initial stop data
    ],
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedStops = [...routeData.stops];
    updatedStops[index][name] = value;
    setRouteData({ ...routeData, stops: updatedStops });
  };

  const addStop = () => {
    setRouteData({
      ...routeData,
      stops: [...routeData.stops, { name: "", location: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/route/add",
        routeData
      );
      alert("Route added successfully!");
      console.log(response.data);
    } catch (error) {
      alert("Failed to add route");
      console.error(error);
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 500, mx: "auto" }}>
      <Typography variant="h4" gutterBottom color="primary">
        Add Route
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Route Name"
          name="routeName"
          value={routeData.routeName}
          onChange={(e) =>
            setRouteData({ ...routeData, routeName: e.target.value })
          }
          required
        />
        <Typography variant="h6" sx={{ mt: 2 }} color="primary">
          Stops (minimum of two stops required)
        </Typography>
        {routeData.stops.map((stop, index) => (
          <Box key={index} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              margin="normal"
              label={`Stop ${index + 1} Name`}
              name="name"
              value={stop.name}
              onChange={(e) => handleChange(e, index)}
              required
            />
            <TextField
              fullWidth
              color="primary"
              margin="normal"
              label={`Stop ${index + 1} Location`}
              name="location"
              value={stop.location}
              onChange={(e) => handleChange(e, index)}
              required
            />
          </Box>
        ))}
        <Button
          variant="outlined"
          color="primary"
          sx={{ mt: 2 }}
          onClick={addStop}
        >
          Add Another Stop
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 4 }}
        >
          Add Route
        </Button>
      </form>
    </Box>
  );
};

export default AddRoute;

// import React, { useState } from "react";
// import { Box, TextField, Button, Typography } from "@mui/material";
// import axios from "axios";

// const AddRoute = () => {
//   const [routeData, setRouteData] = useState({
//     name: "",
//     startLocation: "",
//     endLocation: "",
//     stops: "",
//     duration: "",
//     buses: "",
//   });

//   const handleChange = (e) => {
//     setRouteData({ ...routeData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("/api/route/add", {
//         ...routeData,
//         stops: routeData.stops.split(",").map((stop) => stop.trim()),
//         buses: routeData.buses.split(",").map((bus) => bus.trim()),
//       });
//       alert("Route added successfully!");
//       console.log(response.data);
//     } catch (error) {
//       alert("Failed to add route");
//       console.error(error);
//     }
//   };

//   return (
//     <Box sx={{ p: 4, maxWidth: 500, mx: "auto" }}>
//       <Typography variant="h4" gutterBottom>
//         Add Route
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           fullWidth
//           margin="normal"
//           label="Route Name"
//           name="name"
//           onChange={handleChange}
//           required
//         />
//         <TextField
//           fullWidth
//           margin="normal"
//           label="Start Location"
//           name="startLocation"
//           onChange={handleChange}
//           required
//         />
//         <TextField
//           fullWidth
//           margin="normal"
//           label="End Location"
//           name="endLocation"
//           onChange={handleChange}
//           required
//         />
//         <TextField
//           fullWidth
//           margin="normal"
//           label="Stops (comma-separated)"
//           name="stops"
//           onChange={handleChange}
//         />
//         <TextField
//           fullWidth
//           margin="normal"
//           label="Duration (minutes)"
//           name="duration"
//           type="number"
//           onChange={handleChange}
//           required
//         />
//         <TextField
//           fullWidth
//           margin="normal"
//           label="Bus IDs (comma-separated)"
//           name="buses"
//           onChange={handleChange}
//         />
//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           fullWidth
//           sx={{ mt: 2 }}
//         >
//           Add Route
//         </Button>
//       </form>
//     </Box>
//   );
// };

// export default AddRoute;

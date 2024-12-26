import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";

const UpdateRoute = () => {
  const [routeId, setRouteId] = useState("");
  const [routeData, setRouteData] = useState({});

  const handleChange = (e) => {
    setRouteData({ ...routeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/route/update/${routeId}`,
        routeData
      );
      alert("Route updated successfully!");
      console.log(response.data);
    } catch (error) {
      alert("Failed to update route");
      console.error(error);
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 500, mx: "auto" }}>
      <Typography variant="h4" gutterBottom color="primary">
        Update Route
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Route ID"
          value={routeId}
          onChange={(e) => setRouteId(e.target.value)}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Route Name"
          name="name"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Start Location"
          name="startLocation"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="End Location"
          name="endLocation"
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Update Route
        </Button>
      </form>
    </Box>
  );
};

export default UpdateRoute;

// import React, { useState, useEffect } from "react";
// import { Box, TextField, Button, Typography } from "@mui/material";
// import axios from "axios";

// const UpdateRoute = ({ routeId }) => {
//   const [routeData, setRouteData] = useState({
//     name: "",
//     startLocation: "",
//     endLocation: "",
//     stops: [],
//     distance: "",
//     estimatedTime: "",
//   });

//   const handleChange = (e) => {
//     setRouteData({ ...routeData, [e.target.name]: e.target.value });
//   };

//   const handleStopChange = (index, e) => {
//     const newStops = [...routeData.stops];
//     newStops[index] = { ...newStops[index], [e.target.name]: e.target.value };
//     setRouteData({ ...routeData, stops: newStops });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.put(
//         `http://localhost:5000/api/route/update/${routeId}`,
//         routeData
//       );
//       alert("Route updated successfully!");
//       console.log(response.data);
//     } catch (error) {
//       alert("Failed to update route");
//       console.error(error);
//     }
//   };

//   const fetchRouteData = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/route/${routeId}`);
//       setRouteData(response.data);
//     } catch (error) {
//       console.error("Error fetching route data:", error);
//     }
//   };

//   useEffect(() => {
//     if (routeId) {
//       fetchRouteData();
//     }
//   }, [routeId]);

//   return (
//     <Box sx={{ p: 4, maxWidth: 500, mx: "auto" }}>
//       <Typography variant="h4" gutterBottom color="primary">
//         Update Route
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           fullWidth
//           margin="normal"
//           label="Route ID"
//           value={routeId}
//           disabled
//         />
//         <TextField
//           fullWidth
//           margin="normal"
//           label="Route Name"
//           name="name"
//           value={routeData.name}
//           onChange={handleChange}
//           required
//         />
//         <TextField
//           fullWidth
//           margin="normal"
//           label="Start Location"
//           name="startLocation"
//           value={routeData.startLocation}
//           onChange={handleChange}
//           required
//         />
//         <TextField
//           fullWidth
//           margin="normal"
//           label="End Location"
//           name="endLocation"
//           value={routeData.endLocation}
//           onChange={handleChange}
//           required
//         />
//         <TextField
//           fullWidth
//           margin="normal"
//           label="Distance (km)"
//           name="distance"
//           value={routeData.distance}
//           onChange={handleChange}
//           required
//         />
//         <TextField
//           fullWidth
//           margin="normal"
//           label="Estimated Time (hrs)"
//           name="estimatedTime"
//           value={routeData.estimatedTime}
//           onChange={handleChange}
//           required
//         />

//         {routeData.stops.map((stop, index) => (
//           <Box key={index} sx={{ mt: 2 }}>
//             <Typography variant="h6">Stop {index + 1}</Typography>
//             <TextField
//               fullWidth
//               margin="normal"
//               label="Stop Name"
//               name="stopName"
//               value={stop.stopName}
//               onChange={(e) => handleStopChange(index, e)}
//               required
//             />
//             <TextField
//               fullWidth
//               margin="normal"
//               label="Stop Location"
//               name="stopLocation"
//               value={stop.stopLocation}
//               onChange={(e) => handleStopChange(index, e)}
//               required
//             />
//           </Box>
//         ))}

//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           fullWidth
//           sx={{ mt: 2 }}
//         >
//           Update Route
//         </Button>
//       </form>
//     </Box>
//   );
// };

// export default UpdateRoute;

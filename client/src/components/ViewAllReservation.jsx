import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import axios from "axios";

const ViewAllReservations = () => {
  const [reservations, setReservations] = useState([]); // Ensure this starts as an array
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState(""); // Add an error state for better debugging

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/reservation/viewAll"
        );
        console.log("Reservations fetched:", response.data); // Debugging
        setReservations(response.data.reservations); // Ensure response.data is an array
      } catch (error) {
        setError("Failed to fetch reservations: " + error.message);
        console.error("Error fetching reservations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, []);

  if (loading) return <p>Loading reservations...</p>; // Loading indicator
  if (error) return <p>{error}</p>; // Display error message if any

  return (
    <div>
      <Typography variant="h2">All Reservations</Typography>
      <Typography variant="h4">
        Total Reservations: {reservations.length}
      </Typography>
      <Typography color="primary">
        {reservations.length > 0 ? (
          <table border="1" cellPadding="5" color="primary">
            <thead>
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Bus ID</th>
                <th>Route ID</th>
                <th>Date</th>
                <th>Seat Number</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation._id}>
                  <td>{reservation._id}</td>
                  <td>{reservation.userId}</td>
                  <td>{reservation.busId}</td>
                  <td>{reservation.routeId}</td>
                  <td>{reservation.date}</td>
                  <td>{reservation.seatNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Typography color="primary">No reservations found.</Typography> // Handle case when no data is returned
        )}
      </Typography>
    </div>
  );
};

export default ViewAllReservations;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const ViewAllReservations = () => {
//   const [reservations, setReservations] = useState([]);

//   useEffect(() => {
//     const fetchReservations = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/reservation/viewAll"
//         );
//         setReservations(response.data.reservations);
//         console.log(response.data);
//         console.log(reservations);
//       } catch (error) {
//         alert("Error fetching reservations: " + error.response?.data?.message);
//       }
//     };
//     fetchReservations();
//   }, []);

//   return (
//     <div>
//       <h2>All Reservations</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>User ID</th>
//             <th>Bus ID</th>
//             <th>Route ID</th>
//             <th>Date</th>
//             <th>Seat Number</th>
//           </tr>
//         </thead>
//         <tbody>
//           {reservations.map((reservation) => (
//             <tr key={reservation._id}>
//               <td>{reservation._id}</td>
//               <td>{reservation.userId}</td>
//               <td>{reservation.busId}</td>
//               <td>{reservation.routeId}</td>
//               <td>{reservation.date}</td>
//               <td>{reservation.seatNumber}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ViewAllReservations;

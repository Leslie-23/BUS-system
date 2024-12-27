import React, { useState } from "react";
import axios from "axios";

const ViewReservationById = () => {
  const [reservationId, setReservationId] = useState("");
  const [reservation, setReservation] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http:localhost:5000/api/reservation/view/${reservationId}`
      );
      setReservation(response.data);
      console.log(response.data);
    } catch (error) {
      alert("Error fetching reservation: " + error.response?.data?.message);
    }
  };

  return (
    <div>
      <h2>View Reservation by ID</h2>
      <input
        type="text"
        placeholder="Enter Reservation ID"
        value={reservationId}
        onChange={(e) => setReservationId(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {reservation && (
        <div>
          <h3>Reservation Details</h3>
          <p>ID: {reservation._id}</p>
          <p>User ID: {reservation.userId}</p>
          <p>Bus ID: {reservation.busId}</p>
          <p>Route ID: {reservation.routeId}</p>
          <p>Date: {reservation.date}</p>
          <p>Seat Number: {reservation.seatNumber}</p>
        </div>
      )}
    </div>
  );
};

export default ViewReservationById;

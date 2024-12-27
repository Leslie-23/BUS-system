import React, { useState } from "react";
import axios from "axios";

const AddReservation = () => {
  const [formData, setFormData] = useState({
    userId: "",
    busId: "",
    routeId: "",
    date: "",
    seatNumber: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/reservations", formData);
      alert("Reservation added successfully!");
    } catch (error) {
      alert("Error adding reservation: " + error.response?.data?.message);
    }
  };

  return (
    <div>
      <h2>Add Reservation</h2>
      <form onSubmit={handleSubmit}>
        {["userId", "busId", "routeId", "date", "seatNumber"].map((field) => (
          <div key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
            <input
              type={field === "seatNumber" ? "number" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">Add Reservation</button>
      </form>
    </div>
  );
};

export default AddReservation;

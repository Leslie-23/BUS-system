import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import axios from "axios";

const BuyTicket = () => {
  const [seatNumber, setSeatNumber] = useState("");
  const [price, setPrice] = useState("");
  const [busId, setBusId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/tickets", {
        seatNumber,
        price,
        bus: busId,
      });
      alert(`Ticket purchased: ${data.ticket._id}`);
    } catch (error) {
      console.error(error);
      alert("Failed to purchase ticket");
    }
  };

  return (
    <div>
      <Typography variant="h5">Buy a Ticket</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Seat Number"
          value={seatNumber}
          onChange={(e) => setSeatNumber(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Bus ID"
          value={busId}
          onChange={(e) => setBusId(e.target.value)}
          required
          fullWidth
        />
        <Button variant="contained" type="submit" fullWidth>
          Buy Ticket
        </Button>
      </form>
    </div>
  );
};

export default BuyTicket;

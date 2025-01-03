import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Typography,
} from "@mui/material";
import axios from "axios";

const ManageTickets = () => {
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    try {
      const { data } = await axios.get("/api/tickets");
      setTickets(data.tickets);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch tickets");
    }
  };

  const revokeTicket = async (id) => {
    try {
      await axios.put(`/api/tickets/${id}/revoke`);
      alert("Ticket revoked successfully");
      fetchTickets();
    } catch (error) {
      console.error(error);
      alert("Failed to revoke ticket");
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div>
      <Typography variant="h5">Manage Tickets</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Seat Number</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket._id}>
              <TableCell>{ticket._id}</TableCell>
              <TableCell>{ticket.seatNumber}</TableCell>
              <TableCell>{ticket.price}</TableCell>
              <TableCell>{ticket.status}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => revokeTicket(ticket._id)}
                  disabled={ticket.status === "revoked"}
                >
                  Revoke
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageTickets;

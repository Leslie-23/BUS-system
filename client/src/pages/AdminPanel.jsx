import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [buses, setBuses] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch buses
    const fetchBuses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/bus/viewAll"
        );
        setBuses(response.data);
      } catch (error) {
        console.error("Error fetching buses:", error);
      }
    };

    // Fetch users
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/viewAll"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchBuses();
    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear admin token
    navigate("/admin-login"); // Redirect to admin login
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin Panel
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ padding: 2 }}>
        <Typography variant="h5" gutterBottom>
          Welcome to the Admin Panel
        </Typography>
        <Grid container spacing={4}>
          {/* Buses Table */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Buses
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Bus ID</TableCell>
                    <TableCell>Route</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {buses.map((bus) => (
                    <TableRow key={bus._id}>
                      <TableCell>{bus._id}</TableCell>
                      <TableCell>{bus.route}</TableCell>
                      <TableCell>{bus.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* Users Table */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Users
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>User ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>{user._id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminPanel;

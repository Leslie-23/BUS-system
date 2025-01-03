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
  const [loading, setLoading] = useState([]);
  const [admins, setAdmins] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch buses
    // const fetchBuses = async () => {
    //   try {
    //     const response = await axios.get(
    //       "http://localhost:5000/api/bus/viewAll"
    //     );
    //     setBuses(response.data);
    //   } catch (error) {
    //     console.error("Error fetching buses:", error);
    //   }
    // };

    const fetchBuses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/bus/viewAll"
        );
        if (response.data && Array.isArray(response.data.buses)) {
          setBuses(response.data.buses);
          //   console.log(response.data.buses);
        } else {
          throw new Error("Unexpected API response format");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Fetch users
    // const fetchUsers = async () => {
    //   try {
    //     const response = await axios.get(
    //       "http://localhost:5000/api/users/viewAll"
    //     );
    //     setUsers(response.data);
    //   } catch (error) {
    //     console.error("Error fetching users:", error);
    //   }
    // };

    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users/viewAll");
        const data = await response.json();

        if (!data || !Array.isArray(data.users)) {
          throw new Error("Unexpected API response format for users");
        }

        setUsers(data.users);
        // console.log("API Response:", data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchAdmins = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users/admins"); // Adjust URL
        // const data = await response.json();
        // setAdmins(data.admins);

        if (Array.isArray(response.data.admin)) {
          setAdmins(response.data.admin);
        } else {
          console.error("Unexpected API response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };

    fetchBuses();
    fetchUsers();
    fetchAdmins();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear admin token
    navigate("/admin-login"); // Redirect to admin login
  };
  const handleAddBus = () => {
    navigate("/add-bus");
  };
  const handleViewAllBuses = () => {
    navigate("/view-all-buses");
  };
  const handleViewProfile = () => {
    navigate("/view-admin-profile");
  };
  const handleUpdateBus = () => {
    navigate("/update-bus");
  };
  const handleViewBusByType = () => {
    navigate("/view-bus-by-type");
  };
  const handleDeleteBus = () => {
    navigate("/delete-bus");
  };
  const handleAddRoute = () => {
    navigate("/add-route");
  };
  const handleViewAllRoutes = () => {
    navigate("/view-all-routes");
  };
  const handleUpdateRoute = () => {
    navigate("/update-route");
  };
  const handleDeleteRoute = () => {
    navigate("/delete-route");
  };
  const handleViewRouteById = () => {
    navigate("/view-route-by-id");
  };
  const handleViewAllFeedback = () => {
    navigate("/view-all-feedback");
  };
  const handleManageTickets = () => {
    navigate("/manage-tickets");
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
      }}
      maxWidth="lg"
    >
      <AppBar position="sticky" sx={{ mb: 3 }}>
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
        <Typography variant="h5" gutterBottom color="primary">
          Welcome to the Admin Panel
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          color="primary"
          onClick={handleAddBus}
        >
          Add Bus
        </Button>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          color="primary"
          onClick={handleViewAllBuses}
        >
          View all buses
        </Button>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          color="primary"
          onClick={handleUpdateBus}
        >
          Update Bus
        </Button>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          color="primary"
          onClick={handleViewProfile}
        >
          View Profile
        </Button>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          color="primary"
          onClick={handleViewBusByType}
        >
          View Bus by Type
        </Button>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          color="primary"
          onClick={handleDeleteBus}
        >
          Delete Bus
        </Button>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          color="primary"
          onClick={handleAddRoute}
        >
          Add Route
        </Button>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          color="primary"
          onClick={handleViewAllRoutes}
        >
          View All Routes
        </Button>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          color="primary"
          onClick={handleViewRouteById}
        >
          View Route By Id
        </Button>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          color="primary"
          onClick={handleUpdateRoute}
        >
          Update Route
        </Button>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          color="primary"
          onClick={handleDeleteRoute}
        >
          Delete Route
        </Button>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          color="primary"
          onClick={handleViewAllFeedback}
        >
          View All Feedback
        </Button>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          color="primary"
          onClick={handleManageTickets}
        >
          Manage Tickets
        </Button>
        <Grid container spacing={4}>
          {/* Buses Table */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom color="primary">
              Buses
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Bus ID</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Capacity</TableCell>
                    <TableCell>Route</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Reg. Number</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {buses.map((bus) => (
                    <TableRow key={bus._id}>
                      <TableCell> {bus._id}</TableCell>
                      <TableCell> {bus.busType}</TableCell>
                      <TableCell> {bus.capacity}</TableCell>
                      <TableCell> {bus.route}</TableCell>
                      <TableCell>
                        {bus.isActive ? "Active" : "Inactive"}
                      </TableCell>
                      <TableCell>{bus.registrationNumber}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {/* <div>
              <h1>Admin Panel</h1>
              {buses.length === 0 ? (
                <div>No buses available</div>
              ) : (
                buses.map((bus) => (
                  <div key={bus._id}>
                    <h3>{bus.name}</h3>
                    <p>Type: {bus.busType}</p>
                    <p>Capacity: {bus.capacity}</p>
                    <p>Registration Number: {bus.registrationNumber}</p>
                    <p>Status: {bus.isActive ? "Active" : "Inactive"}</p>
                  </div>
                ))
              )}
            </div> */}
          </Grid>

          {/* Users Table */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom color="primary">
              Users
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>User ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                {/* <TableBody>
                  {users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>{user._id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody> */}
                <TableBody>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell>{user._id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                          {user.isActive ? "Active" : "Inactive"}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        No users available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom color="primary">
                Admins
              </Typography>
              <TableContainer component={Paper}>
                <TableHead>
                  <TableRow>
                    <TableCell>Admin ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {admins.length > 0 ? (
                    admins.map((admin) => (
                      <TableRow key={admin._id}>
                        <TableCell>{admin.name}</TableCell>
                        <TableCell>{admin.email}</TableCell>
                        {/* <TableCell>{admin.role}</TableCell> */}
                        <TableCell>{admin.isActive ? "Yes" : "No"}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No Admins Found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminPanel;

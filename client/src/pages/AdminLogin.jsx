import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Link,
} from "@mui/material";
import axios from "axios";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/login",
        {
          email,
          password,
          adminKey,
        }
      );

      if (response.data.token) {
        localStorage.setItem("adminToken", response.data.token); // Store admin token
        navigate("/admin-dashboard"); // Redirect to admin dashboard
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Typography variant="h5" gutterBottom color="primary">
          Admin Login
        </Typography>
        <form onSubmit={handleLogin} style={{ width: "100%" }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            label="Admin Key"
            variant="outlined"
            fullWidth
            margin="normal"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            required
          />
          {error && (
            <Typography
              color="error"
              variant="body2"
              align="center"
              sx={{ marginTop: 1 }}
            >
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Login
          </Button>
        </form>
        <Grid container sx={{ marginTop: 2 }}>
          <Grid item xs>
            <Link href="/forgot-password" variant="body2">
              Forgot password or Key?
            </Link>
          </Grid>
          <Grid item xs>
            <Link href="/request-privileges" variant="body2">
              Request Privileges
            </Link>
          </Grid>

          <Grid item xs>
            <Link
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
              variant="body2"
            >
              User Login
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AdminLogin;

// Home.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  AppBar,
  Toolbar,
  Container,
  Link,
  useMediaQuery,
  Snackbar,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Close as CloseIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import map from "./assets/map.jpg";
import AiMap from "./assets/AiMap.jpg";
import BusTicket from "./assets/ticket.png";

// Navbar Component
const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [snackbarOpen, setSnackbarOpen] = useState(isSmallScreen);

  const handleSnackbarClose = () => setSnackbarOpen(false);

  return (
    <>
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => navigate("/")}
            color="black"
          >
            BUS System
          </Typography>
          <Button color="inherit" onClick={() => navigate("/login")}>
            Login
          </Button>
          <Button color="inherit" onClick={() => navigate("/signup")}>
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Welcome to BUS System!"
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackbarClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </>
  );
};

// Header Component
const Header = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        height: isSmallScreen ? "40vh" : "60vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "black",
        textAlign: "center",
        mt: isSmallScreen ? 8 : 10,
        px: 2,
      }}
    >
      <Box>
        <Typography
          variant={isSmallScreen ? "h5" : "h4"}
          gutterBottom
          color="primary"
        >
          Transform Your Bus Travel
        </Typography>
        <Typography variant={isSmallScreen ? "body1" : "h5"}>
          Real-time tracking, AI-powered scheduling, and seamless ticketing
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 3, fontSize: isSmallScreen ? "0.8rem" : "1rem" }}
        >
          Get Started
        </Button>
      </Box>
    </Box>
  );
};

// Main Content Component
const MainContent = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container sx={{ mb: 6 }}>
      <Typography variant="h4" gutterBottom textAlign="center" color="primary">
        Why Choose Our App?
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Box textAlign="center">
            <img
              src={map}
              alt="Real-time Tracking"
              style={{ width: isSmallScreen ? "90%" : "100%" }}
            />
            <Typography variant="h6" sx={{ mt: 2 }} color="black">
              Real-Time Tracking
            </Typography>
            <Typography>
              Know where your bus is at any moment for better planning.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box textAlign="center">
            <img
              src={AiMap}
              alt="AI Scheduling"
              style={{ width: isSmallScreen ? "90%" : "100%" }}
            />
            <Typography variant="h6" sx={{ mt: 2 }} color="black">
              AI Scheduling
            </Typography>
            <Typography>
              Optimize your routes and schedules with AI-powered suggestions.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box textAlign="center">
            <img
              height={isSmallScreen ? "150px" : "200px"}
              src={BusTicket}
              alt="Seamless Ticketing"
              style={{ width: isSmallScreen ? "90%" : "100%" }}
            />
            <Typography variant="h6" sx={{ mt: 2 }} color="black">
              Seamless Ticketing
            </Typography>
            <Typography>
              Book tickets effortlessly and manage reservations with ease.
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          mt: 4,
          fontSize: isSmallScreen ? "0.8rem" : "1rem",
        }}
      >
        Explore Features
      </Button>
    </Container>
  );
};

// Footer Component
const Footer = () => (
  <Box sx={{ backgroundColor: "#f8f8f8", py: 4, textAlign: "center" }}>
    <Typography variant="body2">
      &copy; 2024 BUS System. All rights reserved.
    </Typography>
    <Box>
      <Link href="#" underline="hover" sx={{ mx: 2 }}>
        Privacy Policy
      </Link>
      <Link href="#" underline="hover" sx={{ mx: 2 }}>
        Terms of Service
      </Link>
    </Box>
  </Box>
);

// Home Component
const Home = () => (
  <Box sx={{ backgroundColor: "#f8f8f8" }}>
    <Navbar />
    <Header />
    <MainContent />
    <Footer />
  </Box>
);

export default Home;

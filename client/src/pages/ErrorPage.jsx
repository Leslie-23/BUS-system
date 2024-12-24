import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h4" color="error">
        404 - Page Not Found
      </Typography>
      <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate("/")}>
        Go to Login
      </Button>
    </Box>
  );
};

export default ErrorPage;

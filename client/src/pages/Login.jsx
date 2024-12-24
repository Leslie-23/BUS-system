import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 400,
        mx: "auto",
        mt: 10,
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom color="primary">
        Login
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        fullWidth
        margin="normal"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleLogin}
        color="primary"
        // disabled={!email ||!password}
      >
        Login
      </Button>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Don't have an account?{" "}
        <Button onClick={() => navigate("/signup")}>Sign Up</Button>
        <br />
        <Button onClick={() => navigate("/forgot-password")}>
          Forgot Pasword?
        </Button>
        <br />
        <Button onClick={() => navigate("/admin-login")}>Admin</Button>
      </Typography>
    </Box>
  );
};

export default Login;

// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { login as loginAction } from "../redux/slices/authSlice";
// import { login } from "../services/authService";

// function Login() {
//   const [credentials, setCredentials] = useState({ email: "", password: "" });
//   const dispatch = useDispatch();

//   const handleLogin = async () => {
//     try {
//       const data = await login(credentials);
//       dispatch(loginAction(data));
//       alert("Login successful!");
//     } catch (error) {
//       alert("Login failed!");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-4">
//       <input
//         type="email"
//         placeholder="Email"
//         className="border p-2 mb-2 w-full"
//         value={credentials.email}
//         onChange={(e) =>
//           setCredentials({ ...credentials, email: e.target.value })
//         }
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         className="border p-2 mb-2 w-full"
//         value={credentials.password}
//         onChange={(e) =>
//           setCredentials({ ...credentials, password: e.target.value })
//         }
//       />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// }

// export default Login;

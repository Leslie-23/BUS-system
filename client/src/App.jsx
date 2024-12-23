import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { green } from "@mui/material/colors";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/Profile";

const theme = createTheme({
  palette: {
    primary: {
      main: green[500], // Green as the primary color
    },
    background: {
      default: "#ffffff", // White background
    },
    text: {
      primary: "#000000", // Black text for readability
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
  },
});
const App = () => {
  return (
    // <Router>
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}{" "}
        {/*unprotected route above. now using a wrapper to secure and ensure the authentication*/}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            // <PrivateRoute>
            <AdminPanel />
            // </PrivateRoute>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </ThemeProvider>
    //  </Router>
  );
};

export default App;

// import { useState } from "react";
// import "./App.css";
// import Login from "./pages/Login.jsx";

// function App() {
//   const [count, setCount] = useState(0);

//   return <Login />;
// }

// export default App;

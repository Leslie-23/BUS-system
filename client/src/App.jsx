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
import UpdateProfile from "./components/UpdateProfile";
import DeleteProfile from "./components/DeleteProfile";
import ViewRoutes from "./components/ViewRoutes";
import AddBus from "./components/AddBus";
import ViewAllBuses from "./components/ViewAllBuses";
import UpdateBus from "./components/UpdateBus";
import ViewBusByType from "./components/ViewBusByType";
import DeleteBus from "./components/DeleteBus";
import AddRoute from "./components/AddRoute";
import ViewAllRoutes from "./components/ViewAllRoutes";
import UpdateRoute from "./components/UpdateRoute";
import DeleteRoute from "./components/DeleteRoute";
import ViewRouteById from "./components/ViewRouteById";

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
        <Route path="/view-admin-profile" element={<Profile />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/delete-profile" element={<DeleteProfile />} />
        <Route path="/view-all-routes" element={<ViewRoutes />} />
        <Route path="/add-bus" element={<AddBus />} />
        <Route path="/view-all-buses" element={<ViewAllBuses />} />
        <Route path="/update-bus" element={<UpdateBus />} />
        <Route path="/view-bus-by-type" element={<ViewBusByType />} />
        <Route path="/delete-bus" element={<DeleteBus />} />
        <Route path="/add-route" element={<AddRoute />} />
        <Route path="/view-all-routes" element={<ViewAllRoutes />} />
        {/*also hadling searching routes in the above*/}
        <Route path="/update-route" element={<UpdateRoute />} />
        <Route path="/delete-route" element={<DeleteRoute />} />
        <Route path="/view-route-by-id" element={<ViewRouteById />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
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

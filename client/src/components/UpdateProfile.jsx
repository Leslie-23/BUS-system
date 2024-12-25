import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Box,
  Alert,
} from "@mui/material";

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    isActive: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // Fetch the current user's details
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          `http://localhost:5000/api/user/view/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch user details");
        const data = await response.json();
        setFormData(data);
      } catch (err) {
        console.error(err);
        setError("Could not fetch user details.");
      }
    };

    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:5000/api/user/update/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Failed to update profile");
      const data = await response.json();
      setSuccess("Profile updated successfully!");
      //   console.log(data);
    } catch (err) {
      console.error(err);
      setError("Error updating profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, color: "green" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Update Profile
      </Typography>
      {loading && (
        <Box display="flex" justifyContent="center" sx={{ mb: 2 }}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        {/* <TextField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Box display="flex" alignItems="center" sx={{ mt: 2, mb: 2 }}>
          <Typography variant="body1" sx={{ mr: 2 }}>
            Active Status
          </Typography>
          <Switch
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
          />
        </Box> */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Update Profile
        </Button>
      </form>
    </Container>
  );
};

export default UpdateProfile;
// chnaged to mui styling above same code below with native html styling and formatting

// import React, { useState, useEffect } from "react";

// const UpdateProfile = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     role: "",
//     isActive: false,
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   useEffect(() => {
//     // Fetch the current user's details
//     const fetchUserDetails = async () => {
//       const userId = localStorage.getItem("userId");
//       const token = localStorage.getItem("token");

//       try {
//         const response = await fetch(
//           `http://localhost:5000/api/user/view/${userId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         if (!response.ok) throw new Error("Failed to fetch user details");
//         const data = await response.json();
//         setFormData(data);
//       } catch (err) {
//         console.error(err);
//         setError("Could not fetch user details.");
//       }
//     };

//     fetchUserDetails();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     const userId = localStorage.getItem("userId");
//     const token = localStorage.getItem("token");

//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/user/update/${userId}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(formData),
//         }
//       );

//       if (!response.ok) throw new Error("Failed to update profile");
//       const data = await response.json();
//       setSuccess("Profile updated successfully!");
//       console.log(data);
//     } catch (err) {
//       console.error(err);
//       setError("Error updating profile.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ color: "green" }}>
//       <h1>Update Profile</h1>
//       {loading && <p>Loading...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {success && <p style={{ color: "green" }}>{success}</p>}
//       <form onSubmit={handleSubmit}>
//         <label>
//           Name:
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Email:
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         {/* <label>
//           Phone:
//           <input
//             type="text"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Role:
//           <input
//             type="text"
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Active Status:
//           <input
//             type="checkbox"
//             name="isActive"
//             checked={formData.isActive}
//             onChange={handleChange}
//           />
//         </label> */}
//         <br />
//         <button type="submit">Update Profile</button>
//       </form>
//     </div>
//   );
// };

// export default UpdateProfile;

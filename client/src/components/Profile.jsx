import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Alert,
} from "@mui/material";

const Profile = () => {
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle errors

  useEffect(() => {
    // Get userId from localStorage
    const currentUserId = localStorage.getItem("userId");

    if (currentUserId) {
      const fetchProfile = async () => {
        try {
          setLoading(true); // Start loading
          const response = await fetch(
            `http://localhost:5000/api/user/view/${currentUserId}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token for authorization
              },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch profile");
          }

          const data = await response.json();
          setProfile(data.user); // Update profile data
        } catch (error) {
          setError(error.message); // Set error if any
        } finally {
          setLoading(false); // Stop loading
        }
      };

      fetchProfile();
    } else {
      setLoading(false); // Stop loading if no userId
    }
  }, []);

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", marginTop: "20px" }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ marginTop: "10px" }}>
          Loading profile...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ marginTop: "20px" }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ marginTop: "20px" }} maxWidth="lg">
      {profile ? (
        <Card sx={{ maxWidth: 600, margin: "0 auto", padding: "20px" }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Profile Details
            </Typography>
            <Typography variant="body1">
              <strong>Name:</strong> {profile.name}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {profile.email}
            </Typography>
            <Typography variant="body1">
              <strong>Role:</strong> {profile.role}
            </Typography>
            <Typography variant="body1">
              <strong>Phone:</strong> {profile.phone}
            </Typography>
            <Typography variant="body1">
              <strong>Status:</strong>{" "}
              {profile.isActive ? "Active" : "Inactive"}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Alert severity="info">No profile found</Alert>
      )}
    </Container>
  );
};

export default Profile;

// same logic but without mui below

// import React, { useEffect, useState } from "react";

// const Profile = () => {
//   const [profile, setProfile] = useState("");
//   const [loading, setLoading] = useState(true); // To handle loading state
//   const [error, setError] = useState(null); // To handle errors

//   useEffect(() => {
//     // Get userId from localStorage (you could use context or state here too)
//     const currentUserId = localStorage.getItem("userId");
//     // console.log(currentUserId);

//     if (currentUserId) {
//       const fetchProfile = async () => {
//         try {
//           setLoading(true); // Start loading
//           const response = await fetch(
//             `http://localhost:5000/api/user/view/${currentUserId}`,
//             {
//               method: "GET",
//               headers: {
//                 Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token for authorization
//               },
//             }
//           );

//           if (!response.ok) {
//             throw new Error("Failed to fetch profile");
//           }

//           const data = await response.json();
//           // console.log(data.user);
//           setProfile(data.user); // Update profile data
//         } catch (error) {
//           setError(error.message); // Set error if any
//         } finally {
//           setLoading(false); // Stop loading
//         }
//       };

//       fetchProfile();
//     } else {
//       setLoading(false); // Stop loading if no userId
//     }
//   }, []);

//   if (loading) {
//     return <p>Loading profile...</p>; // Show loading message
//   }

//   if (error) {
//     return <p>{error}</p>; // Show error message
//   }

//   return (
//     <div>
//       {profile ? (
//         <div>
//           <h1>Profile Details</h1>
//           <p>Name: {profile.name}</p>
//           <p>Email: {profile.email}</p>
//           <p>Role: {profile.role}</p>
//           <p>Phone: {profile.phone}</p>
//           <p>Status: {profile.isActive ? "Active" : "Inactive"}</p>
//         </div>
//       ) : (
//         <p>No profile found</p> // Handle case when profile is not found
//       )}
//     </div>
//   );
// };

// export default Profile;

// import React, { useEffect, useState } from "react";

// const Profile = () => {
//   const [profile, setProfile] = useState(null);
//   const [userId, setUserId] = useState(null); // Store user ID if using context or token

//   useEffect(() => {
//     const currentUserId = localStorage.getItem("userId"); // the userId is stored in localStorage

//     if (currentUserId) {
//       setUserId(currentUserId);
//     }

//     const fetchProfile = async () => {
//       if (!userId) return; // Ensure the userId is available

//       try {
//         const response = await fetch(
//           `http://localhost:5000/api/user/view/${userId}`
//         );
//         const data = await response.json();
//         setProfile(data);
//         console.log(data);
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//       }
//     };

//     fetchProfile();
//   }, [userId]); // Dependency array ensures it runs when userId changes

//   return (
//     <div>
//       {profile ? (
//         <div>
//           <h1>Profile Details</h1>
//           <p>Name: {profile.name}</p>
//           <p>Email: {profile.email}</p>
//           <p>Role: {profile.role}</p>
//           <p>Phone: {profile.phone}</p>
//           <p>Status: {profile.isActive ? "Active" : "Inactive"}</p>
//         </div>
//       ) : (
//         <p>Loading profile...</p>
//       )}
//     </div>
//   );
// };

// export default Profile;

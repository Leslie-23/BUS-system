import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login as loginAction } from "../redux/slices/authSlice";
import { login } from "../services/authService";

function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const data = await login(credentials);
      dispatch(loginAction(data));
      alert("Login successful!");
    } catch (error) {
      alert("Login failed!");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <input
        type="email"
        placeholder="Email"
        className="border p-2 mb-2 w-full"
        value={credentials.email}
        onChange={(e) =>
          setCredentials({ ...credentials, email: e.target.value })
        }
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 mb-2 w-full"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <button
        className="bg-blue-500 text-white p-2 w-full"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
}

export default Login;

/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);

      // Response-la varra user data-va 'user' nu local storage-la veinga
      localStorage.setItem("user", JSON.stringify(response.data));

      const user = response.data;

      // usertype-ah check panni redirect pannunga
      if (user.usertype === "Admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      alert("Login failed! Check your credentials.");
    }
  };
  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "400px",
        margin: "4rem auto",
        border: "1px solid #333",
        borderRadius: "12px",
        backgroundColor: "#1a1a1a",
        color: "#fff",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Log In</h2>

      <form
        onSubmit={handleLogin}
        style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              padding: "0.8rem",
              borderRadius: "6px",
              border: "1px solid #444",
              backgroundColor: "#2a2a2a",
              color: "#fff",
            }}
          />
        </div>

        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              padding: "0.8rem",
              borderRadius: "6px",
              border: "1px solid #444",
              backgroundColor: "#2a2a2a",
              color: "#fff",
            }}
          />
        </div>

        {error && (
          <p style={{ color: "#ff4d4d", fontSize: "0.9rem", margin: 0 }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          style={{
            padding: "1rem",
            backgroundColor: "#ff9900",
            color: "#000",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "1rem",
            marginTop: "0.5rem",
          }}
        >
          Log In
        </button>
      </form>

      <p
        style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.9rem" }}
      >
        Don't have an account?{" "}
        <span
          style={{ color: "#ff9900", cursor: "pointer" }}
          onClick={() => navigate("/register")}
        >
          Register here
        </span>
      </p>
    </div>
  );
};

export default Login;

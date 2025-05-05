import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_BACKEND}/admin/login`, {
        email,
        password,
      });
      if (response.data.message === "Login successful") {
        console.log(response.data.userId);
        navigate(`/adminhome/${response.data.userId}`);
      }
    } catch (error) {
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundImage: "linear-gradient(to right, #11998e, #38ef7d)", // New gradient (teal to green)
      fontFamily: "'Poppins', sans-serif",
    },
    card: {
      backgroundColor: "#ffffff",
      padding: "2rem",
      borderRadius: "12px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      maxWidth: "400px",
      width: "100%",
    },
    title: {
      fontSize: "1.8rem",
      fontWeight: "600",
      color: "#333",
      marginBottom: "0.5rem",
    },
    subtitle: {
      fontSize: "1rem",
      color: "#555",
      marginBottom: "2rem",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    input: {
      width: "100%",
      padding: "0.75rem",
      border: "1px solid #ddd",
      borderRadius: "8px",
      fontSize: "1rem",
      outline: "none",
      transition: "border 0.3s ease",
    },
    inputFocus: {
      border: "1px solid #38ef7d",
    },
    button: {
      width: "100%",
      padding: "0.75rem",
      backgroundColor: "#11998e", // Teal button color
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "1rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#38ef7d", // Green hover effect
    },
    error: {
      color: "#e53e3e",
      fontSize: "0.9rem",
      marginTop: "1rem",
    },
    footer: {
      marginTop: "1.5rem",
      fontSize: "0.9rem",
      color: "#555",
    },
    link: {
      color: "#11998e", // Teal for links
      fontWeight: "600",
      textDecoration: "none",
      marginLeft: "5px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Admin Login</h1>
        <p style={styles.subtitle}></p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
        {errorMessage && <p style={styles.error}>{errorMessage}</p>}
      </div>
    </div>
  );
}
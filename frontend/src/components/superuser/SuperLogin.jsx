import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookie  from "js-cookie";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_BACKEND}/superUser/login`, {
        email: email,
        pass: password,
      });

      if (response.status === 200) {
        Cookie.set("superuser","authenicated")
        navigate("/superUser/home");
      }
    } catch (error) {
      setErrorMessage("Invalid credentials or network error.");
      console.error("Login error:", error);
    }
  };

  // Inline styles
  const styles = {
    body: {
      fontFamily: "Poppins, Arial, sans-serif",
      background: "linear-gradient(to right, #6a11cb, #2575fc)",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: 0,
    },
    container: {
      background: "#fff",
      borderRadius: "12px",
      padding: "40px",
      maxWidth: "400px",
      width: "100%",
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
    },
    title: {
      fontSize: "28px",
      fontWeight: "600",
      marginBottom: "10px",
      color: "#4a4a4a",
    },
    subtitle: {
      fontSize: "16px",
      marginBottom: "30px",
      color: "#888888",
    },
    input: {
      width: "100%",
      padding: "12px 15px",
      margin: "10px 0",
      border: "1px solid #ddd",
      borderRadius: "8px",
      fontSize: "14px",
      backgroundColor: "#f9f9f9",
      transition: "0.3s ease",
    },
    inputFocus: {
      borderColor: "#6a11cb",
      backgroundColor: "#fff",
    },
    button: {
      width: "100%",
      padding: "12px 15px",
      backgroundColor: "#6a11cb",
      border: "none",
      borderRadius: "8px",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      marginTop: "15px",
    },
    buttonHover: {
      backgroundColor: "#2575fc",
    },
    errorMessage: {
      color: "red",
      fontSize: "14px",
      marginTop: "10px",
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.title}>Welcome Back!</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            style={styles.input}
          />
          <input
            type="password"
            name="pass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            style={styles.input}
          />
          {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
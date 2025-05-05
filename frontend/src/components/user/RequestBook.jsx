import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import Footer from "./Footer";

const RequestBook = () => {
  const {id}=useParams();
  const [formData, setFormData] = useState({
    isbn: "",
    title: "",
    author: "",
    quantity: 1,
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "quantity" && (value < 0 || value > 10)) {
        alert("Quantity must be between 1 and 10");
        return;
      }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.quantity < 0 || formData.quantity > 10) {
        alert("Quantity must be between 1 and 10.");
        return;
      }
      const phonePattern = /^[6789][0-9]{9}$/;
      if (formData.phone && !phonePattern.test(formData.phone)) {
        alert("Please enter a valid phone number in India format (e.g., 9876543210).");
        return;
      }
    try {
      const response = await axios.post("http://localhost:4000/request", formData);
      alert(response.data); // Show success message
      setFormData({
        isbn: "",
        title: "",
        author: "",
        quantity: 1,
        email: "",
        phone: "",
      }); // Reset form
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("Failed to submit the request. Please try again.");
    }
  };

  const styles = {
    container: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "2rem",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      fontSize: "2rem",
      color: "#333",
      textAlign: "center",
      marginBottom: "2rem",
    },
    form: {
      display: "grid",
      gap: "1rem",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
    },
    label: {
      marginBottom: "0.5rem",
      fontWeight: "bold",
      color: "#555",
    },
    input: {
      padding: "0.75rem",
      fontSize: "1rem",
      border: "1px solid #ccc",
      borderRadius: "4px",
      transition: "border-color 0.3s ease",
    },
    button: {
      backgroundColor: "#4A5568",
      color: "white",
      padding: "0.75rem 1.5rem",
      fontSize: "1rem",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
  };

  return (
    <div>
      <Navbar id={id}/>
      <div style={styles.container}>
        <h1 style={styles.title}>Request a Book</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="isbn" style={styles.label}>ISBN13:</label>
            <input
              type="text"
              id="isbn"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              placeholder="Enter ISBN13"
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="title" style={styles.label}>Book Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter Book Title"
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="author" style={styles.label}>Author:</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Enter Author"
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="quantity" style={styles.label}>Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              placeholder="Enter Quantity"
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email Id:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email Id"
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="phone" style={styles.label}>Phone/Mobile:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter Phone/Mobile"
              required
              style={styles.input}
            />
          </div>
          <div>
            <button type="submit" style={styles.button}>Request</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default RequestBook;


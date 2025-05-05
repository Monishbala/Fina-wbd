import React, { useState } from "react";
import axios from "axios";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    category: "general",
    description: "",
  });

  const [message, setMessage] = useState("");

  const styles = {
    container: {
      display: "flex",
      justifyContent: "space-around",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      background: "linear-gradient(to bottom, #f0f4f7, #ffffff)",
      minHeight: "100vh",
    },
    contactForm: {
      width: "100%",
      maxWidth: "500px",
      backgroundColor: "#ffffff",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      marginBottom: "20px",
    },
    formTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "20px",
      color: "#333",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "16px",
    },
    select: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "16px",
      backgroundColor: "#fff",
    },
    textarea: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "16px",
      resize: "vertical",
    },
    button: {
      width: "100%",
      padding: "12px",
      fontSize: "16px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    message: {
      textAlign: "center",
      marginTop: "15px",
      color: "green",
    },
    errorMessage: {
      textAlign: "center",
      marginTop: "15px",
      color: "red",
    },
    imageSection: {
      textAlign: "center",
      marginTop: "20px",
    },
    contactImage: {
      maxWidth: "100%",
      borderRadius: "8px",
    },
    contactInfo: {
      marginTop: "20px",
      fontSize: "14px",
      lineHeight: "1.6",
      color: "#555",
    },
    socialMedia: {
      display: "flex",
      justifyContent: "center",
      gap: "10px",
      marginTop: "20px",
    },
    socialLink: {
      color: "#007bff",
      textDecoration: "none",
      fontSize: "14px",
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/contact", formData);
      setMessage("Your message has been sent successfully!");
      setFormData({
        name: "",
        email: "",
        address: "",
        phone: "",
        category: "general",
        description: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("Failed to send message. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.contactForm}>
        <h2 style={styles.formTitle}>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <select
            style={styles.select}
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="general">General Inquiry</option>
            <option value="feedback">Feedback</option>
            <option value="support">Support</option>
          </select>
          <textarea
            style={styles.textarea}
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            required
          ></textarea>
          <button style={styles.button} type="submit">
            Submit
          </button>
        </form>
        {message && (
          <p
            style={
              message.includes("successfully")
                ? styles.message
                : styles.errorMessage
            }
          >
            {message}
          </p>
        )}
      </div>
      <div style={styles.imageSection}>
        <img
          src="https://www.bookswagon.com/images/contactus.png"
          alt="Contact Us"
          style={styles.contactImage}
        />
        <div style={styles.contactInfo}>
          <h3>ADDRESS</h3>
          <p>SR Ecommerce Factory Pvt. Ltd.,</p>
          <p>2/14, ground floor , Ansari road ,</p>
          <p>Daryaganj Delhi 110002</p>
          <p>Email: customerservice@bookbank.com</p>
          <p>Tel: 011-41521153, Closed on Sundays and public holidays</p>
          <p>9:00am to 6:00pm</p>
        </div>
        <div style={styles.socialMedia}>
          <a href="https://facebook.com" style={styles.socialLink} target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
          <a href="https://twitter.com" style={styles.socialLink} target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
          <a href="https://linkedin.com" style={styles.socialLink} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="https://pinterest.com" style={styles.socialLink} target="_blank" rel="noopener noreferrer">
            Pinterest
          </a>
          <a href="https://youtube.com" style={styles.socialLink} target="_blank" rel="noopener noreferrer">
            YouTube
          </a>
          <a href="https://instagram.com" style={styles.socialLink} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </div>
      </div>
    </div>
  );
}

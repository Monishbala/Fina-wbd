import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const OrderPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    city: "",
    pincode: "",
  });
  const [error, setError] = useState("");

  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/order/${id}`);
        setUserData(response.data.data);
      } catch (err) {
        console.error("Error fetching user for order page:", err);
        setError("Failed to load data. Please try again later.");
      }
    };
    fetchUserData();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:4000/order/${id}`, formData);
      alert("Order placed successfully!");
      navigate(`/orders/${id}`);
    } catch (err) {
      console.error("Error processing order:", err);
      setError("Failed to place order. Please try again.");
    }
  };

  // Calculate total number of items and total price based on count
  const totalItems =
    userData && userData.books
      ? userData.books.reduce((sum, entry) => sum + entry.count, 0)
      : 0;
  const totalPrice =
    userData && userData.books
      ? userData.books.reduce(
          (total, entry) => total + Number(entry.book.Price) * entry.count,
          0
        )
      : 0;

  return (
    <div style={styles.container}>
      {error && <p style={styles.error}>{error}</p>}
      {userData && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <h1 style={styles.heading}>Enter Details</h1>
          <input
            required
            type="text"
            placeholder="Enter Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            required
            type="text"
            placeholder="Enter Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            required
            type="text"
            placeholder="Enter Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            required
            type="text"
            placeholder="Enter City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            required
            type="text"
            placeholder="Enter Pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            style={styles.input}
          />
          {userData.books.map((entry, index) => (
            <div key={index} style={styles.book}>
              <img
                src={entry.book.ImageUrl}
                alt={entry.book.Title}
                style={styles.bookImg}
              />
              <div>
                <p style={styles.bookTitle}>Title: {entry.book.Title}</p>
                <p style={styles.bookPrice}>
                  Price: ₹{entry.book.Price} x {entry.count}
                </p>
                <p style={styles.bookPrice}>
                  Subtotal: ₹{entry.book.Price * entry.count}
                </p>
              </div>
            </div>
          ))}
          <p style={styles.itemCount}>
            Number of Items: {totalItems}
          </p>
          <p style={styles.totalPrice}>
            Total Price: ₹{totalPrice}
          </p>
          <p style={styles.paymentType}>Payment Type: Cash on Delivery</p>
          <button type="submit" style={styles.submitButton}>
            Order Now
          </button>
        </form>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f7f7f7",
    padding: "20px",
    minHeight: "100vh",
  },
  form: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    margin: "0 auto",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxSizing: "border-box",
  },
  book: {
    display: "flex",
    alignItems: "center",
    marginBottom: "15px",
  },
  bookImg: {
    width: "80px",
    marginRight: "15px",
  },
  bookTitle: {
    margin: "0",
    color: "#333",
  },
  bookPrice: {
    margin: "0",
    color: "#333",
  },
  itemCount: {
    color: "#333",
    fontWeight: "bold",
    fontSize: "16px",
  },
  totalPrice: {
    color: "red",
    fontWeight: "bold",
    fontSize: "18px",
    marginTop: "20px",
  },
  paymentType: {
    color: "#555",
    fontSize: "16px",
    marginTop: "10px",
  },
  submitButton: {
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "20px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: "20px",
  },
};

export default OrderPage;

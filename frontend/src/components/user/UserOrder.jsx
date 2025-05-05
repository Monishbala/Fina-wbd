import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

const UserOrders = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  // Fetch user orders
  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/orders/${id}`);
        setUser(response.data.user);
      } catch (err) {
        console.error("Error fetching user orders:", err);
        setError("Failed to load user orders. Please try again later.");
      }
    };
    fetchUserOrders();
  }, [id]);

  return (
    <div>
      <Navbar id={id} />
      <div style={styles.container}>
        <h1 style={styles.heading}>User Orders</h1>
        {error && <p style={styles.error}>{error}</p>}
        {user && (
          <>
            <div style={styles.userDetails}>
              <h2 style={styles.subHeading}>User Details</h2>
              <p>
                <strong>Username:</strong> {user.username}
              </p>
            </div>
            <div style={styles.orders}>
              <h2 style={styles.subHeading}>Orders</h2>
              {user.orders && user.orders.length > 0 ? (
                user.orders.map((order, index) => (
                  <div key={index} style={styles.orderItem}>
                    <div style={styles.orderInfo}>
                      <p>
                        <strong>Name:</strong> {order.name}
                      </p>
                      <p>
                        <strong>Phone:</strong> {order.phone}
                      </p>
                      <p>
                        <strong>Address:</strong> {order.address}
                      </p>
                      <p>
                        <strong>City:</strong> {order.city}
                      </p>
                      <p>
                        <strong>Pincode:</strong> {order.pincode}
                      </p>
                    </div>
                    <div style={styles.books}>
                      <h3 style={styles.bookHeading}>Books:</h3>
                      {order.books && order.books.length > 0 ? (
                        order.books.map((bookEntry, idx) => (
                          <div key={idx} style={styles.bookItem}>
                            <img
                              src={bookEntry.book.ImageUrl}
                              alt={bookEntry.book.Title}
                              style={styles.bookImg}
                            />
                            <div style={styles.bookDetails}>
                              <p style={styles.bookTitle}>
                                {bookEntry.book.Title}
                              </p>
                              <p style={styles.bookPrice}>
                                ₹ {bookEntry.book.Price} x {bookEntry.count}
                              </p>
                              <p style={styles.bookSubtotal}>
                                Subtotal: ₹{" "}
                                {Number(bookEntry.book.Price) * bookEntry.count}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No books in this order.</p>
                      )}
                      <hr style={styles.divider} />
                      <p style={styles.totalPrice}>
                        <strong>
                          Total Price: ₹
                          {order.books.reduce(
                            (total, bookEntry) =>
                              total +
                              Number(bookEntry.book.Price) * bookEntry.count,
                            0
                          )}
                        </strong>
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p style={styles.noOrders}>No orders found.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "900px",
    margin: "30px auto",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#333",
  },
  subHeading: {
    borderBottom: "2px solid #ddd",
    paddingBottom: "5px",
    marginBottom: "15px",
    color: "#333",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: "20px",
  },
  userDetails: {
    marginBottom: "30px",
    padding: "15px",
    backgroundColor: "#f8f8f8",
    borderRadius: "5px",
  },
  orders: {
    marginTop: "20px",
  },
  orderItem: {
    marginBottom: "30px",
    padding: "20px",
    border: "1px solid #eaeaea",
    borderRadius: "8px",
    backgroundColor: "#fdfdfd",
  },
  orderInfo: {
    marginBottom: "15px",
    lineHeight: "1.6",
    color: "#555",
  },
  books: {
    backgroundColor: "#f9f9f9",
    padding: "15px",
    borderRadius: "5px",
  },
  bookHeading: {
    marginBottom: "10px",
    color: "#333",
  },
  bookItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: "15px",
  },
  bookImg: {
    width: "90px",
    height: "auto",
    marginRight: "15px",
    borderRadius: "4px",
  },
  bookDetails: {
    flexGrow: 1,
  },
  bookTitle: {
    fontSize: "16px",
    margin: "0 0 5px 0",
    color: "#333",
  },
  bookPrice: {
    margin: "0 0 3px 0",
    color: "#666",
  },
  bookSubtotal: {
    margin: 0,
    fontWeight: "bold",
    color: "#000",
  },
  divider: {
    margin: "15px 0",
    border: "none",
    borderTop: "1px solid #ddd",
  },
  totalPrice: {
    textAlign: "right",
    fontSize: "18px",
    color: "#d32f2f",
    margin: "10px 0 0 0",
  },
  noOrders: {
    textAlign: "center",
    color: "#888",
  },
};

export default UserOrders;
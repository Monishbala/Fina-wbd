import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
// import Footer from "./Footer";
import { Trash } from 'lucide-react'
const MyBooksPage = () => {
  const { id } = useParams();
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const fetchBooks = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:4000/mybooks/${id}`);
      setBooks(response.data.data.books); // Assuming books are under `data.books`
    } catch (err) {
      console.error("Error fetching books:", err);
      setError("Failed to fetch books. Please try again.");
    }
  }, [id]);
  useEffect(() => {
    fetchBooks();
  }, [id, fetchBooks]);
  const deleteBook = async (bookId , book) => {
    console.log(book)
    try {
      // Adjust the endpoint as needed to delete a book from the user's cart.
     if(!book.seller){
      await axios.delete(`http://localhost:4000/mybooks/${id}/delete/${bookId}`);
    }else{
      await axios.delete(`http://localhost:4000/used/mybooks/${id}/delete/${bookId}`);
    }
      // Update state locally after deletion.
      fetchBooks()
    } catch (err) {
      console.error("Error deleting book:", err);
      setError("Failed to delete book. Please try again.");
    }
  };
  const styles = {
    container: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    book: {
      display: "flex",
      alignItems: "center",
      marginBottom: "20px",
      marginLeft: "40px",
    },
    bookImage: {
      width: "100px",
      height: "150px",
      objectFit: "cover",
      marginRight: "20px",
    },
    bookDetails: {
      flex: 1,
    },
    bookTitle: {
      fontSize: "18px",
      marginBottom: "5px",
    },
    bookPrice: {
      fontSize: "16px",
      color: "#888",
    },
    orderButton: {
      display: "block",
      width: "10%",
      textDecoration: "none",
      color: "#fff",
      backgroundColor: "green",
      padding: "10px 10px",
      borderRadius: "5px",
      marginLeft: "40px",
      transition: "background-color 0.3s",
    },
    orderButtonHover: {
      backgroundColor: "#0056b3",
    },
    error: {
      color: "red",
      textAlign: "center",
      marginTop: "20px",
    },
    deleteButton: {
      background: "none",
      border: "none",
      fontSize: "20px",
      color: "red",
      cursor: "pointer",
      marginLeft: "10px",
    },
  };

  return (
    <div>
      <Navbar id={id} />
      <div style={styles.container}>
        {error && <p style={styles.error}>{error}</p>}
        {books.map((book, index) => (
          <div key={index} style={styles.book}>
            <img src={book.book.ImageUrl} alt={book.book.Title} style={styles.bookImage} />
            <div style={styles.bookDetails}>
              <p style={styles.bookTitle}>Title: {book.book.Title}</p>
              <p style={styles.bookPrice}>Price: ₹ {book.book.Price  * book.count}</p>
              <p style={styles.bookPrice}>Count: {book.count}</p>
            </div>
            <Trash
              onClick={() => deleteBook(book.book._id , book)}
              style={styles.deleteButton}
              title="Delete Book"
            />
          </div>
        ))}
        {books.length > 0 && (
          <a href={`/order/${id}`} style={styles.orderButton}>
            <button style={styles.orderButton}>Order</button>
          </a>
        )}
      </div>
    </div>
  );
};

export default MyBooksPage;
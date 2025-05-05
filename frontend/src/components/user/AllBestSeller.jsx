import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from './Navbar';
import Footer from './Footer';

const AllBooks = () => {
  const { id } = useParams();
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({
    price: "",
    minDiscount: "",
    languages: [],
    searchQuery: "",
  });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKENDURL}/bestseller/${id}`);
        setBooks(response.data.books);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, [id]);

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === "checkbox") {
      setFilters((prev) => ({
        ...prev,
        languages: checked
          ? [...prev.languages, value]
          : prev.languages.filter((lang) => lang !== value),
      }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  const resetFilters = () => {
    setFilters({
      price: "",
      minDiscount: "",
      languages: [],
      searchQuery: "",
    });
  };

  const filterBooks = () => {
    return books.filter((book) => {
      const priceMatch = filters.price
        ? book.Price <= parseInt(filters.price)
        : true;
      const discountMatch = filters.minDiscount
        ? book.Discount >= parseInt(filters.minDiscount)
        : true;
      const languageMatch =
        filters.languages.length > 0
          ? filters.languages.includes(book.Language)
          : true;
      const searchMatch = filters.searchQuery
        ? book.Title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
          book.Author.toLowerCase().includes(filters.searchQuery.toLowerCase())
        : true;
      return priceMatch && discountMatch && languageMatch && searchMatch;
    });
  };

  return (
    <div className="all-books">
      <Navbar id={id} />

      <div className="search-container">
        <input
          type="text"
          name="searchQuery"
          placeholder="Search by title or author"
          value={filters.searchQuery}
          onChange={handleFilterChange}
        />
        <button onClick={filterBooks}>Search</button>
      </div>

      <div className="main-content">
        <div className="filter-section">
          <h3>Filters</h3>
          <div className="filter-group">
            <label htmlFor="searchPrice">Max Price:</label>
            <input
              type="number"
              name="price"
              min="0"
              value={filters.price}
              onChange={handleFilterChange}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="minDiscount">Min Discount %:</label>
            <input
              type="number"
              name="minDiscount"
              min="0"
              max="100"
              value={filters.minDiscount}
              onChange={handleFilterChange}
            />
          </div>
          <div className="filter-group">
            <label>Languages:</label>
            {["English", "Telugu", "Tamil"].map((lang) => (
              <div key={lang} className="checkbox-group">
                <input
                  type="checkbox"
                  id={`${lang.toLowerCase()}Checkbox`}
                  value={lang}
                  onChange={handleFilterChange}
                  checked={filters.languages.includes(lang)}
                />
                <label htmlFor={`${lang.toLowerCase()}Checkbox`}>{lang}</label>
              </div>
            ))}
          </div>
          <div className="filter-buttons">
            {/* <button onClick={filterBooks} className="submit-btn">Apply Filters</button> */}
            <button onClick={resetFilters} className="reset-btn">Reset Filters</button>
          </div>
        </div>

        <div className="books-grid">
          {filterBooks().map((book) => (
            <div className="book-card" key={book._id}>
              <a href={`/book/${book._id}/${id}`}>
                <img src={book.ImageUrl} alt={book.Title} />
              </a>
              <div className="book-info">
                <h3>{book.Title}</h3>
                <p className="author">{book.Author}</p>
                <p className="price">₹{book.Price}</p>
                {book.Discount !== "0%" && (
                  <p className="discount">{book.Discount} off</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />

      <style jsx>{`
        .all-books {
          font-family: Arial, sans-serif;
        }

        .search-container {
          display: flex;
          justify-content: center;
          padding: 20px;
          background-color: #f0f0f0;
        }

       .search-container input {
          width: calc(100% - 700px); /* Adjust based on button width */
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ddd;
          border-radius: 4px 0 0 4px;
        }

        .search-container button {
          padding: 10px 20px;
          font-size: 16px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 0 4px 4px 0;
          cursor: pointer;
        }

        .main-content {
          display: flex;
          margin: 20px;
        }

        .filter-section {
          width: 30%;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }

        .filter-group {
          margin-bottom: 20px;
        }

        .filter-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }

        .filter-group input[type="number"] {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .checkbox-group {
          margin-top: 5px;
        }

        .checkbox-group label {
          margin-left: 5px;
        }

        .filter-buttons {
          display: flex;
          justify-content: space-between;
        }

        .submit-btn, .reset-btn {
          padding: 10px 15px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
        }

        .submit-btn {
          background-color: #4CAF50;
          color: white;
        }

        .reset-btn {
          background-color: #f44336;
          color: white;
        }

        .books-grid {
          width: 70%;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
          padding-left: 20px;
        }

        .book-card {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          overflow: hidden;
          transition: transform 0.3s ease;
        }

        .book-card:hover {
          transform: translateY(-5px);
        }

        .book-card img {
          width: 100%;
          height: 250px;
          object-fit: cover;
        }

        .book-info {
          padding: 15px;
        }

        .book-info h3 {
          margin: 0;
          font-size: 16px;
          color: #333;
        }

        .author {
          color: #666;
          font-size: 14px;
          margin: 5px 0;
        }

        .price {
          font-weight: bold;
          color: #4CAF50;
        }

        .discount {
          color: #f44336;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};

export default AllBooks;


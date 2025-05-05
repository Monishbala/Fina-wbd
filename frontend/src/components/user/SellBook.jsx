import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const SellBook = () => {
  const { id } = useParams();
  const initialFormData = {
    ImageUrl: "",
    Title: "",
    Released: "",
    Author: "",
    Publication: "",
    Price: "",
    MRP: "",
    Language: "",
    count:0,
    ISBN_10: "",
    ISBN_13: "",
    Pages: "",
    About_the_Book: "",
    user:id
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === "Price" || name === "MRP" || name === "Discount") && value < 0) {
      alert(`${name} cannot be negative. Please enter a valid value.`);
      return; // Prevent updating the state with invalid input
    }

    // Validate ISBN-10: Must be exactly 10 digits
  if (name === "ISBN_10" && (value.length > 10 || !/^\d*$/.test(value))) {
    alert("ISBN-10 must contain exactly 10 digits.");
    return;
  }

  // Validate ISBN-13: Must be exactly 13 digits
  if (name === "ISBN_13" && (value.length > 13 || !/^\d*$/.test(value))) {
    alert("ISBN-13 must contain exactly 13 digits.");
    return;
  }
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key].trim()) {
        newErrors[key] = `${key.replace(/_/g, " ")} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getInputType = (key) => {
    if (key === "ImageUrl") return "url";
    if (key === "Released") return "date";
    if (key === "Price" || key === "MRP" || key === "ISBN_10" || key === "ISBN_13" || key === "Pages") return "number";
    return "text";
  };
  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      // Include user ID in the form data
      const dataToSend = {
        ...formData,
        userId: id // Add the user ID from the URL params
      };
      
      const response = await axios.post(`http://localhost:4000/sellbooks`, dataToSend);
      alert(response.data.message || "Book listed successfully!");
      setFormData(initialFormData); // Clear the form
      setErrors({}); // Clear errors
    } catch (error) {
      console.error("Error submitting the form:", error);
      const errorMessage = error.response?.data?.message || "Failed to sell the book. Please try again.";
      alert(errorMessage);
    }
  };

  return (
    <div className="sell-book-page">
      <Navbar id={id} />
      <div className="content">
        <h1>Sell Your Book</h1>
        <form onSubmit={handleSubmit}>
          {Object.keys(formData).map((key) => (
            key === "user" ? null : (
              <div key={key} className="form-group">
                  <label htmlFor={key}>{key.replace(/_/g, " ")}:</label>
                {key === "About_the_Book" ? (
                  <textarea
                    id={key}
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    rows="4"
                  />
                ) : (
                  <input
                    type={getInputType(key)}
                    id={key}
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    min={key === "Released" ? getTodayDate() : undefined} // Add min for Released
                  />
                )}
                {errors[key] && <span className="error-message">{errors[key]}</span>}
              </div>
            )
          ))}
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
      <Footer />

      <style jsx>{`
        .sell-book-page {
          font-family: Arial, sans-serif;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .content {
          flex-grow: 1;
          width: 80%;
          margin: 0 auto;
          padding: 20px;
        }

        h1 {
          color: #333;
          text-align: center;
          margin-bottom: 30px;
        }

        form {
          background-color: #f9f9f9;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .form-group {
          margin-bottom: 20px;
        }

        label {
          display: block;
          margin-bottom: 5px;
          color: #555;
          font-weight: bold;
        }

        input, textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
        }

        textarea {
          resize: vertical;
        }

        .error-message {
          color: red;
          font-size: 14px;
          margin-top: 5px;
          display: block;
        }

        .submit-btn {
          display: flex;
          justify-content: center;
          margin-left: 20%;
          width: 50%;
          padding: 15px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 18px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .submit-btn:hover {
          background-color: #45a049;
        }

        :global(nav), :global(footer) {
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default SellBook;
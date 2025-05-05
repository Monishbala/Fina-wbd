import React, { useState } from 'react';
import axios from 'axios';

const AddBook = () => {
  const [formData, setFormData] = useState({
    ImageUrl: '',
    Title: '',
    Released: '',
    Author: '',
    Publication: '',
    Price: '',
    Discount: '',
    MRP: '',
    Language: '',
    ISBN_10: '',
    ISBN_13: '',
    Pages: '',
    count:0,
    About_the_Book: ''
  });

  const today = new Date().toISOString().split('T')[0];

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

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_BACKEND}`, formData)
      .then(response => {
        alert('Book added successfully');
        setFormData({
          ImageUrl: '',
          Title: '',
          Released: '',
          Author: '',
          Publication: '',
          Price: '',
          Discount: '',
          MRP: '',
          Language: '',
          ISBN_10: '',
          ISBN_13: '',
          Pages: '',
          About_the_Book: ''
        });
      })
      .catch(error => {
        console.error('There was an error adding the book!', error);
        alert('Error adding book');
      });
  };
  return (
    <div className="container">

      <div className="content">
        <h3>Add New Book</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="ImageUrl">Image URL:</label>
          <input 
            type="url" 
            id="ImageUrl" 
            name="ImageUrl" 
            value={formData.ImageUrl} 
            onChange={handleChange} 
            required 
          />

          <label htmlFor="Title">Title:</label>
          <input 
            type="text" 
            id="Title" 
            name="Title" 
            value={formData.Title} 
            onChange={handleChange} 
            required 
          />

          <label htmlFor="Released">Released Date:</label>
          <input 
            type="date" 
            id="Released" 
            name="Released" 
            value={formData.Released} 
            onChange={handleChange} 
            required 
            min={today}
          />

          <label htmlFor="Author">Author:</label>
          <input 
            type="text" 
            id="Author" 
            name="Author" 
            value={formData.Author} 
            onChange={handleChange} 
            required 
          />

          <label htmlFor="Publication">Publication:</label>
          <input 
            type="text" 
            id="Publication" 
            name="Publication" 
            value={formData.Publication} 
            onChange={handleChange} 
            required 
          />

          <label htmlFor="Price">Price:</label>
          <input 
            type="number" 
            id="Price" 
            name="Price" 
            placeholder="0"
            value={formData.Price} 
            onChange={handleChange} 
            
            required 
            min="0"
          />

          <label htmlFor="Discount">Discount:</label>
          <input 
            type="number" 
            id="Discount" 
            name="Discount" 
            placeholder="0"
            value={formData.Discount} 
            onChange={handleChange} 
            required 
             min="0"
          />

          <label htmlFor="MRP">MRP:</label>
          <input 
            type="number" 
            id="MRP" 
            name="MRP" 
            placeholder="0"
            value={formData.MRP} 
            onChange={handleChange} 
            required 
             min="0"
          />

          <label htmlFor="Language">Language:</label>
          <input 
            type="text" 
            id="Language" 
            name="Language" 
            value={formData.Language} 
            onChange={handleChange} 
            required 
          />

          <label htmlFor="ISBN_10">ISBN 10:</label>
          <input 
            type="number" 
            id="ISBN_10" 
            name="ISBN_10" 
            value={formData.ISBN_10} 
            onChange={handleChange} 
            required 
             min="0"
             
          />

          <label htmlFor="ISBN_13">ISBN 13:</label>
          <input 
            type="number" 
            id="ISBN_13" 
            name="ISBN_13" 
            value={formData.ISBN_13} 
            onChange={handleChange} 
            required 
             min="0"
             
          />

        <label htmlFor="count">Count:</label>
          <input 
            type="number" 
            id="count" 
            name="count" 
            value={formData.count} 
            onChange={handleChange} 
            required 
             min="0"
             
          />
          <label htmlFor="Pages">Pages:</label>
          <input 
            type="number" 
            id="Pages" 
            name="Pages" 
            value={formData.Pages} 
            onChange={handleChange} 
            required 
             min="0"
          />

          <label htmlFor="About_the_Book">About the Book:</label>
          <textarea 
            id="About_the_Book" 
            name="About_the_Book" 
            rows="4" 
            value={formData.About_the_Book} 
            onChange={handleChange} 
            required 
          ></textarea>

          <button type="submit">Add Book</button>
        </form>
      </div>

      <style jsx>{`
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }

        .container {
            display: flex;
            min-height: 100vh; /* Ensure it stretches full height */
        }

        .sidebar {
            width: 30%;
            background-color: #333;
            color: white;
            padding: 20px;
            box-sizing: border-box;
            position: fixed; /* Make the sidebar fixed */
            top: 0;
            left: 0;
            height: 100vh; /* Full height */
            overflow-y: auto; /* Scrollable if content overflows */
        }

        .sidebar a {
            display: block;
            color: white;
            padding: 15px;
            text-decoration: none;
            font-size: 18px;
            border-radius: 5px;
            margin-bottom: 10px;
        }

        .sidebar a:hover {
            background-color: #575757;
        }

        .content {
            margin-left: 40%; /* Offset content for the fixed sidebar */
            width: 100%;
            padding: 10px;
            box-sizing: border-box;
        }

        label {
            display: block;
            margin-bottom: 5px;
        }

        input[type="text"], textarea {
            width: 100%;
            padding: 5px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
              input[type="number"], textarea {
            width: 100%;
            padding: 5px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
              input[type="url"], textarea {
            width: 100%;
            padding: 5px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        button[type="submit"] {
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
        }

        button[type="submit"]:hover {
            background-color: #45a049;
        }

        h3 {
            margin-bottom: 20px;
        }

        @media only screen and (max-width: 768px) {
            .sidebar {
                width: 100%;
                height: auto;
                position: relative;
            }

            .content {
                margin-left: 0;
                width: 100%;
            }
        }
      `}</style>
    </div>
  );
};

export default AddBook;
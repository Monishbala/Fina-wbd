import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from './Navbar'
import { useNavigate } from "react-router-dom";
const BookDetails = () => {
  const { bookid, id } = useParams();
  const [bookData, setBookData] = useState(null);
  const [review, setReview] = useState({
    name: "",
    rating: "",
    description: "",
  });
  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get(`http://localhost:4000/sellbooks/book/${bookid}/${id}`)
      .then((response) => {
        setBookData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
      });
  }, [bookid, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReview((prev) => ({ ...prev, [name]: value }));
  };

  const submitReview = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:4000/book/${bookData._id}/${id}`, review)
      .then(() => {
        alert("Review submitted successfully");
        setReview({ name: "", rating: "", description: "" });
      })
      .catch((error) => {
        console.error("Error submitting review:", error);

      });
  };

  if (!bookData) return <div>Loading...</div>;
   const HandleBook= async() => {
     await axios.get(`http://localhost:4000/used/buy/${bookid}/${id}`).then((response)=>{
      if (response.status===200) {
         navigate(`/mybooks/${id}`)
      } else{
        alert("Add to cart Failed")
      }
     })
   }
  return (
    <div className="book-details">
      <Navbar id={id} />

      <div className="box">
        <div className="top">
          <div className="image">
            <img src={bookData.ImageUrl} alt={bookData.Title} />
          </div>
          <div className="top-details">
            <h1 className="heading">{bookData.Title}</h1>
            <p className="author">
              By: {bookData.Author} (Author) | Publisher: {bookData.Publication}
            </p>
            <p>
              {bookData.count >0 ? "In Stock" : "Out of Stock"}
            </p>
            <p className="rate">{bookData.Price}</p>
            <p className="mrp">{bookData.MRP}</p>
          </div>
          <div className="buy-box">
            {bookData.count > 0 && id!= bookData.seller && <button onClick={HandleBook} className="buy">Add to Cart</button>}
              {/* <button onClick={HandleBook} className="buy">Buy Now</button> */}
          </div>
        </div>

        <hr />
        <div className="second">
          {[
            { label: "ISBN 10", value: bookData.ISBN_10 },
            { label: "ISBN 13", value: bookData.ISBN_13 },
            { label: "Pages", value: bookData.Pages },
            { label: "Language", value: bookData.Language },
          ].map((item, index) => (
            <div className="secondelement" key={index}>
              <p className="f1">{item.label}</p>
              <img
                src="https://www.bookswagon.com/images/icons/isbnicon.jpg"
                alt=""
              />
              <p className="f2">{item.value}</p>
            </div>
          ))}
        </div>

        <hr />
        <div className="third">
          <h2 className="productdetails">Product Details</h2>
          <div className="det">
            <div className="book">
              <p><strong>ISBN-13:</strong> {bookData.ISBN_13}</p>
              <p><strong>Publisher:</strong> {bookData.Publication}</p>
              <p><strong>Binding:</strong> Paperback</p>
              <p><strong>Language:</strong> {bookData.Language}</p>
            </div>
          </div>
        </div>

        <hr />
        <div className="final">
          <div className="about">
            <h2 className="heading">About The Book</h2>
            <p className="content">{bookData.About_the_Book}</p>
          </div>
        </div>

        <hr />
       
          
      </div>

      <style jsx>{`
        .book-details {
          font-family: Arial, sans-serif;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #f8f9fa;
          padding: 10px 20px;
          margin-bottom: 20px;
        }

        .logo img {
          height: 50px;
        }

        .nav-links {
          display: flex;
          gap: 20px;
        }

        .nav-link {
          text-decoration: none;
          color: #333;
          font-weight: bold;
        }

        .box {
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          padding: 20px;
        }

        .top {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
        }

        .image img {
          max-width: 300px;
          border-radius: 4px;
        }

        .top-details {
          flex-grow: 1;
        }

        .heading {
          font-size: 24px;
          color: #333;
          margin-bottom: 10px;
        }

        .author {
          font-size: 14px;
          color: #666;
          margin-bottom: 10px;
        }

        .rate {
          font-size: 24px;
          color: #e44d26;
          font-weight: bold;
        }

        .mrp {
          font-size: 16px;
          color: #999;
          text-decoration: line-through;
        }

        .buy {
          background-color: #4CAF50;
          color: white;
          border: none;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          border-radius: 4px;
        }

        .second {
          display: flex;
          justify-content: space-between;
          margin: 20px 0;
        }

        .secondelement {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .f1 {
          font-weight: bold;
        }

        .third, .final {
          margin: 20px 0;
        }

        .productdetails {
          font-size: 20px;
          color: #333;
          margin-bottom: 10px;
        }

        .form-group {
          margin-bottom: 15px;
        }

        label {
          display: block;
          margin-bottom: 5px;
        }

        input, textarea {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .btn {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          border-radius: 4px;
        }

        .review {
          margin-bottom: 20px;
        }

        .personname {
          font-size: 18px;
          color: #333;
        }

        hr {
          border: 0;
          border-top: 1px solid #eee;
          margin: 20px 0;
        }
      `}</style>
    </div>
  );
};

export default BookDetails;


import React, { useState } from 'react';
import axios from 'axios';
import Cookie from 'js-cookie';

const CreateAdmin = () => {
  // State to manage form input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const adminData = { username: email, password };
    
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKENDURL}/admincreate`, adminData);
      if (response.data === "Admin has been successfully created") {
        alert('Admin created successfully');
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error('Error creating admin:', error);
    }
  };
 
  const handlelogout = () => {
    Cookie.remove('superuser');
  };

  return (
    <div className="container">
      <div className="sidebar">
        <a href="/superUser/home" className="sidebar-link">Admins</a>
        <a href="/admincreate" className="sidebar-link">Create Admin</a>
        <a href="/superuser/addbook" className="sidebar-link">Add Book</a>
        <a href="/superuser/analytics" className="sidebar-link">Analytics</a>
        <a onClick={handlelogout} href="/superUser" className="sidebar-link">Logout</a>
      </div>
      
      <div className="content">
        <h3>Create Admin</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="username"
            placeholder="Enter email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Create Admin</button>
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
          min-height: 100vh;
        }

        .sidebar {
          width: 30%;
          background-color: #333;
          color: white;
          padding: 20px;
          box-sizing: border-box;
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          overflow-y: auto;
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
          margin-left: 30%;
          width: 70%;
          padding: 20px;
          box-sizing: border-box;
        }

        form {
          max-width: 400px;
          margin: 20px auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        input[type="email"],
        input[type="password"] {
          width: 100%;
          padding: 10px;
          margin: 10px 0;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        button[type="submit"] {
          width: 100%;
          padding: 10px;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        button[type="submit"]:hover {
          background-color: #0056b3;
        }

        h3 {
          text-align: center;
          margin-bottom: 20px;
          color: #333;
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

export default CreateAdmin;

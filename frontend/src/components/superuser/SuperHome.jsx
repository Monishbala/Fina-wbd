import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
import axios from 'axios';
import Cookie from 'js-cookie'
import { useNavigate } from 'react-router-dom';

const SuperHome = () => {
  const navigate=useNavigate();
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    if(!Cookie.get("superuser"))
    {
      navigate("/superuser")
    }
    axios.get('http://localhost:4000/superuser/home')
      .then((response) => {
        setAdmins(response.data.admins);
      })
      .catch((error) => {
        console.error('There was an error fetching the admin data!', error);
      });
  }, [navigate]);

  const handleChangePermissions = (adminId, permissions) => {
    axios.post(`http://localhost:4000/admincreate/changepermissions/${adminId}`, permissions)
      .then((response) => {
        alert("Permission updated")
        console.log('Permissions updated', response.data);
      })
      .catch((error) => {
        console.error('There was an error updating the permissions!', error);
      });
  };
  const handlelogout = () => {
    Cookie.remove('superuser');
    navigate('/superuser');
  }
  return (
    <div className="container">
      <div className="sidebar">
        <a href="/superUser/home" className="sidebar-link">Admins</a>
        <a href="/admincreate" className="sidebar-link">Create Admin</a>
        <a href="/superuser/addbook" className="sidebar-link">Add Book</a>
        <a href="/superuser/analytics" className="sidebar-link">Analytics</a>
        <button onClick={handlelogout} className="sidebar-link" style={{background: 'none', border: 'none', color: 'white', cursor: 'pointer', width: '100%', textAlign: 'left', padding: '15px', fontSize: '18px'}}>
          Logout
        </button>
      </div>

      <div className="content">
        <div className="items">
          {admins.map((admin) => (
            <div key={admin._id} className="item">
              <p>Name: {admin.username}</p>
              <p>Permissions:</p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const permissions = {
                    user_deleting: e.target.user.checked,
                    book_deleting: e.target.book.checked,
                    view: true,
                  };
                  handleChangePermissions(admin._id, permissions);
                }}
              >
                <label className="checkbox-label">
                  <input
                    name="user"
                    type="checkbox"
                    defaultChecked={admin.permissions.user_deleting}
                  />
                  User Deleting
                </label>
                <label className="checkbox-label">
                  <input
                    name="book"
                    type="checkbox"
                    defaultChecked={admin.permissions.book_deleting}
                  />
                  Book Deleting
                </label>
                <label className="checkbox-label">
                  <input
                    name="view"
                    type="checkbox"
                    disabled
                    defaultChecked
                  />
                  Viewing
                </label>
                <button type="submit" className="button">Change</button>
              </form>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          height: 100vh;
          overflow: hidden;
        }
        .sidebar {
          width: 28%; /* Decreased from 30% */
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
        .sidebar-link {
          display: block;
          color: white;
          text-decoration: none;
          margin-bottom: 10px;
          font-size: 16px;
        }
        .content {
          margin-left: 32%; /* Increased from 30% */
        //   width: 68%; /* Decreased from 70% */
          padding: 20px;
          box-sizing: border-box;
          overflow-y: hidden;
          height: 100vh;
        }
        .items {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
        }
        .item {
          background-color: #f5f5f5;
          border: 1px solid #ddd;
          border-radius: 5px;
          padding: 10px;
          margin: 10px;
          width: calc(33.33% - 20px);
          box-sizing: border-box;
        }
        .checkbox-label {
          display: block;
          margin-bottom: 5px;
        }
        .button {
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 5px;
          padding: 5px 10px;
          font-size: 13px;
          cursor: pointer;
        }
        .button:hover {
          background-color: #45a049;
        }
      `}</style>
    </div>
  );
};

export default SuperHome;


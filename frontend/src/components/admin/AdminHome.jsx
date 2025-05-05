import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminHome = () => {
  const { admin } = useParams(); // Get the admin ID from the URL
  const [usersData, setUsersData] = useState([]);
  const [booksData, setBooksData] = useState([]);
  const [sellBooksData, setSellBooksData] = useState([]);
  const [permissions, setPermissions] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/adminhome/${admin}`);
      const { data, admin: adminInfo } = response.data;
      // Set all the data in useEffect itself
      setUsersData(data.usersdata);
      setBooksData(data.books);
      setSellBooksData(data.sellbook);
      setPermissions(adminInfo.permissions || {});
    } catch (error) {
      console.error("Error fetching admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [admin]);

  if (loading) return <div>Loading...</div>;
  const  handledelete= async(id)=>{
    axios.get(`http://localhost:4000/delete/user/${id}`).then((response)=>{
           fetchData()
           alert("user deleted successfuully")
       })
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div style={sidebarStyle}>
        <ul style={ulStyle}>
          <li>
            <Link to={`/adminhome/${admin}`} style={linkStyle}>
              Users
            </Link>
          </li>
          <li>
            <Link to={`/adminhome/bookadmin/${admin}`} style={linkStyle}>
              Books
            </Link>
          </li>
          <li>
            <button
              style={logoutButtonStyle}
              onClick={() => navigate("/admin/loginpages")}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={contentStyle}>
        <div>
          <p>Total no Of Users: {usersData.length}</p>
          <p>Total no Of Books: {booksData.length}</p>
          <p>Total no Of Used Books: {sellBooksData.length}</p>
        </div>
        <div>
          <h2>Users</h2>
          {usersData.map((user, index) => (
            <div key={user._id} style={userCardStyle}>
              <h3>User {index + 1}</h3>
              <p>Email: {user.username}</p>
              <p>Password: {user.password}</p>
              {permissions.user_deleting && (
                <a  style={{ textDecoration: "none" }}>
                  <button  onClick={()=>{handledelete(user._id)}}type="button" style={deleteButtonStyle}>
                    Delete
                  </button>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Styles
const sidebarStyle = {
  width: "250px",
  background: "#f4f4f4",
  padding: "20px",
};

const ulStyle = {
  listStyle: "none",
  padding: 0,
};

const linkStyle = {
  display: "block",
  padding: "10px 15px",
  color: "#333",
  textDecoration: "none",
  marginBottom: "10px",
  borderRadius: "4px",
  backgroundColor: "#eaeaea",
};

const contentStyle = {
  flex: 1,
  padding: "20px",
};

const userCardStyle = {
  marginBottom: "15px",
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "4px",
};

const deleteButtonStyle = {
  padding: "5px 10px",
  background: "#f44336",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const logoutButtonStyle = {
  padding: "10px 15px",
  background: "#1976d2",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default AdminHome;

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminBook = () => {
  const { admin } = useParams(); // Get the admin ID from the URL
  const [usersData, setUsersData] = useState([]);
  const [booksData, setBooksData] = useState([]);
  const [sellBooksData, setSellBooksData] = useState([]);
  const [permissions, setPermissions] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      console.log(admin);
      
      const response = await axios.get(`http://localhost:4000/adminhome/bookadmin/${admin}`);
      console.log(response.data);
      
      const { data, admin2: adminInfo } = response.data;

      // Ensure adminInfo exists and handle potential issues with missing properties
      if (adminInfo && adminInfo.permissions) {
        setPermissions(adminInfo.permissions);
      } else {
        console.error("Admin permissions data is missing or invalid");
        setPermissions({});  // Fallback in case permissions are missing
      }

      // Set all the data in useEffect itself
      setUsersData(data.usersdata);
      setBooksData(data.books);
      setSellBooksData(data.sellbook);
    } catch (error) {
      console.error("Error fetching admin data:", error);
    } finally {
      setLoading(false);
    }
  }, [admin]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Filter books based on the search query
  const filteredBooks = booksData.filter((book) => {
    const query = searchQuery.toLowerCase();
    return (
      book.Title.toLowerCase().includes(query) ||
      book.Author.toLowerCase().includes(query)
    );
  });

  if (loading) return <div>Loading...</div>;
 
  const  handledelete= async(id)=>{
    axios.get(`http://localhost:4000/delete/book/${id}`).then((response)=>{
           fetchData()
           alert("book deleted successfuully")
       })
  }

  const handleLogout = () => {
    navigate('/admin/loginpages');
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div style={sidebarStyle}>
        <ul style={ulStyle}>
          <li>
            <a href={`/adminhome/${admin}`} style={linkStyle}>Users</a>
          </li>
          <li>
            <a href={`/adminhome/bookadmin/${admin}`} style={linkStyle}>Books</a>
          </li>
          <li>
            <button
              style={logoutButtonStyle}
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={contentStyle}>
        <div className="search-bar" style={searchBarStyle}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            style={searchInputStyle}
            placeholder="Search by title or author..."
          />
          <button onClick={() => {}} className="search-btn" style={searchButtonStyle}>Search</button>
        </div>

        <div className="info" style={infoStyle}>
          <p>Total no Of Users: {usersData.length}</p>
          <p>Total no Of Books: {booksData.length}</p>
          <p>Total no Of Used Books: {sellBooksData.length}</p>
        </div>

        <div className="book-container">
          <h2 style={bookTitleStyle}>All Books</h2>
          <div className="book" style={bookGridStyle}>
            {filteredBooks.map((book) => (
              <div
                key={book._id}
                className="box"
                style={bookBoxStyle}
                data-price={book.Price}
                data-discount={book.Discount !== '0%'}
                data-language={book.Language}
              >
                <img src={book.ImageUrl} alt={book.Title} style={bookImageStyle} />
                <p className="tite" style={bookTitleStyle}>{book.Title}</p>
                <p className="author" style={bookAuthorStyle}>{book.Author}</p>
                <p className="price" style={bookPriceStyle}>{book.Price}</p>
                {permissions.book_deleting && (
                  <a  style={deleteButtonLinkStyle}>
                    <button onClick={() => handledelete(book._id)} style={deleteButtonStyle}>Delete</button>
                    </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles
const sidebarStyle = {
  width: '25%',
  backgroundColor: '#f0f0f0',
  padding: '20px',
};

const ulStyle = {
  listStyle: 'none',
  padding: 0,
};

const linkStyle = {
  display: 'block',
  padding: '10px 15px',
  color: '#333',
  textDecoration: 'none',
  marginBottom: '10px',
  borderRadius: '4px',
  backgroundColor: '#eaeaea',
};

const logoutButtonStyle = {
  padding: '10px 15px',
  backgroundColor: '#1976d2',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const contentStyle = {
  flex: 1,
  padding: '20px',
};

const searchBarStyle = {
  width: '75%',
  textAlign: 'center',
  marginTop: '20px',
  marginBottom: '20px',
};

const searchInputStyle = {
  width: '70%',
  padding: '8px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  marginRight: '5px',
};

const searchButtonStyle = {
  padding: '8px 16px',
  backgroundColor: 'black',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const infoStyle = {
  marginTop: '20px',
};

const bookGridStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Add space between items
    gap: '20px', // Add gap between books
  };
  
  const bookBoxStyle = {
    width: '300px',
    height: 'auto',  // Adjust height based on content
    margin: '10px 0', // Add top and bottom margin for better spacing
    boxSizing: 'border-box',
    padding: '10px', // Padding around book content
    backgroundColor: '#fff', // White background for books for better contrast
    borderRadius: '8px', // Rounded corners for the book boxes
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
  };
  
  const bookTitleStyle = {
    fontWeight: 'bold',
    fontSize: '18px',
    marginBottom: '10px', // Space below title
  };
  
  const bookAuthorStyle = {
    fontStyle: 'italic',
    fontSize: '16px',
    marginBottom: '10px', // Space below author name
  };
  
  const bookPriceStyle = {
    color: '#007bff',
    fontSize: '18px',
    marginBottom: '10px', // Space below price
  };
  
  const bookImageStyle = {
    width: '100%',
    height: 'auto',
    borderRadius: '8px', // Rounded corners for the image
    marginBottom: '10px', // Space below the image
  };
  

const deleteButtonStyle = {
  padding: '5px 10px',
  backgroundColor: '#f44336',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const deleteButtonLinkStyle = {
  textDecoration: 'none',
};

export default AdminBook;

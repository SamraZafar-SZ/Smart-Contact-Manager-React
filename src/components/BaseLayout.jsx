import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./BaseLayout.css";

const BaseLayout = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <>
      <nav className="fixed-top navbar navbar-expand-lg navbar-light bg-light">
        <span className="nav-link" aria-disabled="true">{user ? user.name : 'User Name'}</span>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">Home <span className="sr-only"></span></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/logout" aria-disabled="true">Log Out</Link>
            </li>
          </ul>
          
        </div>
      </nav>

      <div className="sidebar mt-2" id="sidebar">
        <span onClick={toggleSidebar} className="crossbtn">&times;</span>
        <Link to="/dashboard" className="item"><i className="fa-solid fa-house-user"></i> Dashboard</Link>
        <Link to="/user/contacts" className="item"><i className="fa-solid fa-address-book"></i> View Contacts</Link>
        <Link to="/add-contact" className="item"><i className="fa-solid fa-plus"></i> Add Contact</Link>
        <Link to="/profile" className="item"><i className="fa-solid fa-user"></i> Your Profile</Link>
        <Link to="/settings" className="item"><i className="fa-solid fa-gear"></i> Settings</Link>
        <Link to="/logout" className="item"><i className="fa-solid fa-right-from-bracket"></i> Logout</Link>
        <div className="divider"></div>
      </div>

      <div className="content mt-5">
        <i onClick={toggleSidebar} className="fas fa-bars m-3"></i>
        {children}
      </div>
    </>
  );
};

const toggleSidebar = () => {
  const sidebar = document.getElementById('sidebar');
  sidebar.style.display = sidebar.style.display === 'none' ? 'block' : 'none';
};

export default BaseLayout;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import UserDashboard from './components/UserDashboard';
import Profile from './components/Profile';
import ShowContacts from './components/ShowContacts';
import Settings from './components/Settings';
import AddContactFrom from './components/AddContactForm';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user/contacts" element={<ShowContacts />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/add-contact" element={<AddContactFrom />} />
      </Routes>
    </Router>
  );
}

export default App;

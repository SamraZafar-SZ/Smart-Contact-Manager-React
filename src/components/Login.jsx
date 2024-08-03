import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8282/do_login', { username, password }, { withCredentials: true });
      const { success, message, user } = response.data;
      if (success) {
        localStorage.setItem("user", JSON.stringify(user));
        navigate('/dashboard'); // Redirect to dashboard
      } else {
        setError(message);
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError(err.response.data.message); // Set the error message from the response
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <Layout>
      <div id="login">
        <div className="container">
          <div id="login-row" className="row justify-content-center align-items-center">
            <div id="login-column" className="col-md-12">
              <div id="login-box" className="col-md-12">
                <form id="login-form" className="form" onSubmit={handleLogin}>
                  <h3 className="text-center text-info">Login</h3>
                  {error && <div className="alert alert-danger">{error}</div>}
                  <div className="form-group">
                    <label htmlFor="username" className="text-info">Username:</label><br />
                    <input 
                      type="text" 
                      name="username" 
                      id="username" 
                      className="form-control" 
                      value={username} 
                      onChange={(e) => setUsername(e.target.value)} 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password" className="text-info">Password:</label><br />
                    <input 
                      type="password" 
                      name="password" 
                      id="password" 
                      className="form-control" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                    />
                  </div>
                  <div className="form-group" style={{ marginTop: '10px' }}>
                    <input type="submit" name="submit" className="btn btn-info btn-md" value="submit" />
                  </div>
                  <div id="register-link" className="text-right">
                    <a href="/signup" className="text-info">Register here</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;

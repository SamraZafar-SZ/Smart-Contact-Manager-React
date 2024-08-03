import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import './Signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [about, setAbout] = useState('');
  const [message, setMessage] = useState({ content: '', type: '' });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8282/do_register', { name, email, password, about });
      const { success, message } = response.data;
      setMessage({ content: message, type: success ? 'alert-success' : 'alert-danger' });
      if (success) {
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setMessage({ content: err.response.data.message, type: 'alert-danger' });
      } else {
        setMessage({ content: 'An error occurred. Please try again.', type: 'alert-danger' });
      }
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12 offset-md-0">
            <div className="my-card">
              {message.content && <div className={`alert ${message.type}`} role="alert">{message.content}</div>}
              <h1 className="text-center">Register Here</h1>
              <form onSubmit={handleSignup}>
                <div className="form-group">
                  <input 
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name_field" 
                    placeholder="Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="email" 
                    name="email" 
                    className="form-control" 
                    id="email_field" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="password" 
                    name="password" 
                    className="form-control" 
                    id="password_field" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <textarea 
                    name="about" 
                    className="form-control" 
                    placeholder="Enter something about yourself" 
                    rows="3" 
                    value={about} 
                    onChange={(e) => setAbout(e.target.value)}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-warning">Submit</button>
                <button type="reset" className="btn btn-dark">Reset</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;

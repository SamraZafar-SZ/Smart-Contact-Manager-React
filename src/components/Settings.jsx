import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BaseLayout from './BaseLayout';

const Settings = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8282/user/change-password', {
        oldPassword,
        newPassword
      }, {
        withCredentials: true, // Ensure credentials are included
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:8282',
          'Access-Control-Allow-Credentials': 'true'
        }
      });
      if (response.data.success) {
        setSuccess(response.data.message);
        setError('');
      } else {
        setError(response.data.message);
        setSuccess('');
      }
    } catch (err) {
      setError('Failed to change password');
      setSuccess('');
    }
  };

  return (
    <BaseLayout>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <h3 className="my-4">Change Password</h3>
                  <form onSubmit={handleChangePassword}>
                    <div className="form-group">
                      <input
                        name="oldPassword"
                        type="password"
                        className="form-control"
                        required
                        placeholder="Enter Old Password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                      <input
                        name="newPassword"
                        type="password"
                        className="form-control mt-3"
                        required
                        placeholder="Enter New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <button type="submit" className="btn btn-success mt-5">Change</button>
                      <button type="reset" className="btn btn-warning mt-5" onClick={() => {
                        setOldPassword('');
                        setNewPassword('');
                        setError('');
                        setSuccess('');
                      }}>Reset</button>
                    </div>
                    {error && <div className="alert alert-danger mt-3">{error}</div>}
                    {success && <div className="alert alert-success mt-3">{success}</div>}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
};

export default Settings;


import React, { useState, useEffect } from 'react';
import BaseLayout from './BaseLayout';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <BaseLayout>
      <section>
        <div className="container">
          <div className="card">
            <div className="card-body">
              <h1>{user.name}</h1>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#USERID</th>
                    <th scope="col">{user.id}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Email</th>
                    <td>{user.email}</td>
                  </tr>
                  <tr>
                    <th scope="row">Name</th>
                    <td>{user.name}</td>
                  </tr>
                  <tr>
                    <th scope="row">Role</th>
                    <td>{user.role}</td>
                  </tr>
                  <tr>
                    <th scope="row">Account Active</th>
                    <td>{user.enabled ? 'Yes' : 'No'}</td>
                  </tr>
                  <tr>
                    <th scope="row">About You</th>
                    <td>{user.about}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
};

export default Profile;

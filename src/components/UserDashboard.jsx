import React from 'react';
import BaseLayout from './BaseLayout'; // Ensure correct import
import './UserDashboard.css';

const UserDashboard = () => {
  return (
    <BaseLayout>
      <section>
        <div className="container">
          <div className="card">
            <div className="card-body">
              <div className="text-center container">
              <div className="profile_picture text-center container"></div>
                <h2 className="text-center mt-2">Start adding your contacts on cloud</h2>
                <a href="/user/add-contact" className="mt-4 btn btn-primary btn-block text-uppercase">Add Contacts</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
};

export default UserDashboard;

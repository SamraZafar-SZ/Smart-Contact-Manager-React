import React, { useState } from 'react';
import axios from 'axios';
import BaseLayout from './BaseLayout';
import './AddContactForm.css';

const AddContactForm = () => {
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    work: '',
    description: '',
    profileImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setContact((prevContact) => ({
      ...prevContact,
      profileImage: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(contact).forEach((key) => {
      formData.append(key, contact[key]);
    });

    try {
      const response = await axios.post('http://localhost:8282/user/process-contact', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error adding contact:', error);
    }
};


  return (
    <BaseLayout>
      <section>
        <div className="card mr-5 ml-3">
          <div className="card-body">
            <h1>Add Contact</h1>
            <div className="container-fluid mt-1">
              <div className="row">
                <div className="col-md-10 offset-md-1">
                  <form onSubmit={handleSubmit} className="mt-2" encType="multipart/form-data">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i className="fa fa-user-alt"></i>
                        </div>
                      </div>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="First Name"
                        className="form-control"
                        required
                        onChange={handleChange}
                      />
                    </div>
                    <div className="input-group mt-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i className="fas fa-user-alt"></i>
                        </div>
                      </div>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Last Name"
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="input-group mt-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i className="fa fa-phone"></i>
                        </div>
                      </div>
                      <input
                        min="11"
                        type="text"
                        id="phone"
                        name="phone"
                        placeholder="Phone"
                        className="form-control"
                        required
                        onChange={handleChange}
                      />
                    </div>
                    <div className="input-group mt-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text">@</div>
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="input-group mt-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i className="fa fa-briefcase"></i>
                        </div>
                      </div>
                      <input
                        type="text"
                        id="work"
                        name="work"
                        placeholder="Work"
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group mt-2">
                      <textarea
                        placeholder="Enter Contact Description"
                        name="description"
                        id="description"
                        className="form-control"
                        rows="5"
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <div className="custom-file">
                      <input type="file" name="profileImage" onChange={handleFileChange} />
                    </div>
                    <div className="container text-center">
                      <button className="btn btn-outline-primary">Save Contact</button>
                    </div>
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

export default AddContactForm;

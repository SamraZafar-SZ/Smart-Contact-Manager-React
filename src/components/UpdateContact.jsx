import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import './UpdateContact.css';

const UpdateContactForm = () => {
  const { cID } = useParams();
  const history = useHistory();
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    work: '',
    description: '',
    profileImage: null,
  });

  useEffect(() => {
    axios.get(`http://localhost:8282/user/${cID}/contact`, { withCredentials: true })
      .then(response => {
        setContact(response.data);
      })
      .catch(error => {
        console.error('Error fetching contact:', error);
      });
  }, [cID]);

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
      await axios.post(`http://localhost:8282/user/process-update`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      history.push(`/user/${cID}/contact`);
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  return (
    <div className="card mr-5 ml-3">
      <div className="card-body">
        <h1>Update Contact</h1>
        <div className="container-fluid mt-1">
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <form onSubmit={handleSubmit} className="mt-2" encType="multipart/form-data">
                <input type="hidden" name="cID" value={contact.cID} />

                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i className="fa fa-user-alt"></i>
                    </div>
                  </div>
                  <input type="text" id="firstName" name="firstName" placeholder="First Name" className="form-control" value={contact.firstName} required onChange={handleChange} />
                </div>

                <div className="input-group mt-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i className="fas fa-user-alt"></i>
                    </div>
                  </div>
                  <input type="text" id="lastName" name="lastName" placeholder="Last Name" className="form-control" value={contact.lastName} onChange={handleChange} />
                </div>

                <div className="input-group mt-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i className="fa fa-phone"></i>
                    </div>
                  </div>
                  <input type="text" id="phone" name="phone" placeholder="Phone" className="form-control" value={contact.phone} required onChange={handleChange} />
                </div>

                <div className="input-group mt-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">@</div>
                  </div>
                  <input type="email" id="email" name="email" placeholder="Email" className="form-control" value={contact.email} onChange={handleChange} />
                </div>

                <div className="input-group mt-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i className="fa fa-briefcase"></i>
                    </div>
                  </div>
                  <input type="text" id="work" name="work" placeholder="Work" className="form-control" value={contact.work} onChange={handleChange} />
                </div>

                <div className="form-group mt-2">
                  <textarea placeholder="Enter Contact Description" name="description" id="description" className="form-control" rows="5" value={contact.description} onChange={handleChange}></textarea>
                </div>

                <div className="container">
                  <img style={{ width: "100px", height: "100px" }} className="image-fluid profile_picture" src={`http://localhost:8282/img/${contact.image}`} alt="" />
                </div>
                <p className="text-secondary">Choose a new picture</p>
                <div className="custom-file">
                  <input type="file" name="profileImage" onChange={handleFileChange} />
                </div>

                <div className="container text-center">
                  <button className="btn btn-outline-primary">Update Contact</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateContactForm;

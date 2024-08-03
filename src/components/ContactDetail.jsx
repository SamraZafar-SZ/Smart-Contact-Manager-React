import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import './ContactDetail.css';

const ContactDetail = () => {
  const { cID } = useParams();
  const history = useHistory();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8282/user/${cID}/contact`, { withCredentials: true })
      .then(response => {
        setContact(response.data);
      })
      .catch(error => {
        console.error('Error fetching contact:', error);
      });
  }, [cID]);

  const deleteContact = (id) => {
    axios.get(`http://localhost:8282/user/delete/${id}`, { withCredentials: true })
      .then(response => {
        history.push('/user/show-contacts/0');
      })
      .catch(error => {
        console.error('Error deleting contact:', error);
      });
  };

  if (!contact) {
    return <h1>Unauthorized Access Denied</h1>;
  }

  return (
    <div className="card ml-3 mr-3 text-center">
      <div className="card-body">
        <div className="container">
          <img src={`http://localhost:8282/img/${contact.image}`} style={{ height: "150px", width: "150px" }} className="profile_picture" alt="" />
          <h3 className="mt-3">{contact.firstName} {contact.lastName}</h3>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#ID</th>
                <th scope="col">{contact.cID}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Email</th>
                <td>{contact.email}</td>
              </tr>
              <tr>
                <th scope="row">Phone</th>
                <td>{contact.phone}</td>
              </tr>
              <tr>
                <th scope="row">Work</th>
                <td>{contact.work}</td>
              </tr>
              <tr>
                <th scope="row">Description</th>
                <td>{contact.description}</td>
              </tr>
            </tbody>
          </table>
          <button onClick={() => deleteContact(contact.cID)} className="btn btn-danger btn-sm">Delete</button>
          <form method="post" action={`/user/update-contact/${contact.cID}`} className="mt-1">
            <button type="submit" className="btn btn-secondary btn-sm">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactDetail;

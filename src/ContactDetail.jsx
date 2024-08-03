import React from 'react';
import './ContactDetails.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ContactDetail = () => {
  const { cID } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = React.useState(null);

  React.useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get(`http://localhost:8282/user/${cID}/contact`, {
          withCredentials: true,
        });
        setContact(response.data);
      } catch (error) {
        console.error("Failed to fetch contact", error);
      }
    };
    fetchContact();
  }, [cID]);

  const deleteContact = async () => {
    try {
      await axios.delete(`http://localhost:8282/user/delete/${cID}`, {
        withCredentials: true,
      });
      navigate('/contacts');
    } catch (error) {
      console.error("Failed to delete contact", error);
    }
  };

  if (!contact) {
    return <h1>Unauthorized Access Denied</h1>;
  }

  return (
    <div className="container">
      <div className="card ml-3 mr-3 text-center">
        <div className="card-body">
          <img src={`http://localhost:8282/img/${contact.image}`} alt="Profile" className="profile_picture" />
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

          <button onClick={deleteContact} className="btn btn-danger btn-sm">Delete</button>
          <form method="post" action={`http://localhost:8282/user/update-contact/${contact.cID}`} className="mt-1">
            <button type="submit" className="btn btn-secondary btn-sm">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactDetail;

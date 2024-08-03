import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import BaseLayout from './BaseLayout';
import './ShowContacts.css';

const ShowContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContacts = async (page = 0) => {
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        try {

          const response = await axios.get(`http://localhost:8282/user/show-contacts/0`, {
            withCredentials: true, // Ensure credentials are included
            headers: {
              'Access-Control-Allow-Origin': 'http://localhost:8282',
              'Access-Control-Allow-Credentials': 'true'
            }
          });
          console.log(response);
          setContacts(response.data.contacts || []);
          setCurrentPage(response.data.currentPage || 0);
          setTotalPages(response.data.totalPages || 1);
        } catch (err) {
          if (err.response && err.response.status === 302) {
            navigate('/login'); // Redirect to login if not authenticated
          } else {
            setError('Failed to fetch contacts');
            setContacts([]); // Ensure contacts is an empty array on error
          }
        }
      } else {
        navigate('/login'); // Redirect to login if no user data found
      }
    };

    fetchContacts(currentPage);
  }, [currentPage, navigate]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteContact = async (cID) => {
    try {
      await axios.delete(`http://localhost:8282/user/delete/${cID}`, {
        withCredentials: true, // Ensure credentials are included
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:5173',
          'Access-Control-Allow-Credentials': 'true'
        }
      });
      setContacts(contacts.filter(contact => contact.cID !== cID));
    } catch (err) {
      setError('Failed to delete contact');
    }
  };

  return (
    <BaseLayout>
      <div className="container">
        <div className="card mr-4 ml-3">
          <div className="card-body">
            <h2 className="text-center">Your Contacts</h2>

            <div className="search-container my-4">
              <input
                onChange={handleSearch}
                id="search-input"
                type="text"
                className="form-control"
                placeholder="Search here"
              />
              <div className="search-result"></div>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.length > 0 ? (
                  filteredContacts.map((contact) => (
                    <tr key={contact.cID}>
                      <th scope="row">{contact.cID}</th>
                      <td>{contact.firstName} {contact.lastName}</td>
                      <td>
                        <Link to={`/user/${contact.cID}/contact`}>
                          {contact.email}
                        </Link>
                      </td>
                      <td>{contact.phone}</td>
                      <td>
                        <button onClick={() => deleteContact(contact.cID)} className="btn btn-danger btn-sm">Delete</button>
                        <form method="post" action={`/user/update-contact/${contact.cID}`} className="mt-1">
                          <button type="submit" className="btn btn-secondary btn-sm">Update</button>
                        </form>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No contacts found.</td>
                  </tr>
                )}
              </tbody>
            </table>

            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(0)}>First</button>
                </li>
                <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                </li>
                {[...Array(totalPages).keys()].map(page => (
                  <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(page)}>{page + 1}</button>
                  </li>
                ))}
                <li className={`page-item ${currentPage + 1 === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                </li>
                <li className={`page-item ${currentPage + 1 === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(totalPages - 1)}>Last</button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default ShowContacts;

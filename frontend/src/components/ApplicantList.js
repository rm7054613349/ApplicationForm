import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ApplicantForm from './ApplicantForm';
import './Appp.css'; // Importing the CSS file

const App = () => {
  const [applicants, setApplicants] = useState([]);
  const [error, setError] = useState(null);

  const fetchApplicants = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/applicants');
      setApplicants(response.data);
    } catch (err) {
      setError('Failed to fetch applicants. Please try again later.');
      console.error('Error fetching applicants:', err);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/applicants/${id}`);
      setApplicants(applicants.filter((applicant) => applicant._id !== id));
      alert('Applicant deleted successfully!');
    } catch (err) {
      console.error('Error deleting applicant:', err);
      alert('Failed to delete applicant. Please try again.');
    }
  };

  return (
    <div >
      <h1>Application Registration Form</h1>
      <ApplicantForm onFormSubmit={fetchApplicants} />
      {error && <p className="error">{error}</p>}
      <h1>View Details</h1>
      <table className="applicant-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Father's Name</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Religion</th>
            <th>Caste</th>
            <th>Address</th>
            <th>Hobbies</th>
            <th>Country</th>
            <th>State</th>
            <th>District</th>
            <th>Photo</th>
            <th>Signature</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applicants.length ? (
            applicants.map((applicant) => (
              <tr key={applicant._id}>
                <td>{applicant.name}</td>
                <td>{applicant.fatherName}</td>
                <td>{new Date(applicant.dateOfBirth).toLocaleDateString()}</td>
                <td>{applicant.gender}</td>
                <td>{applicant.religion}</td>
                <td>{applicant.casteCategory}</td>
                <td>{applicant.address}</td>
                <td>{applicant.hobbies ? applicant.hobbies.join(', ') : 'N/A'}</td>
                <td>{applicant.country}</td>
                <td>{applicant.state}</td>
                <td>{applicant.district}</td>
                <td>
                  {applicant.photo ? (
                    <img
                      src={`http://localhost:5000/${applicant.photo}`}
                      alt="Applicant Photo"
                      className="applicant-img"
                    />
                  ) : (
                    'N/A'
                  )}
                </td>
                <td>
                  {applicant.signature ? (
                    <img
                      src={`http://localhost:5000/${applicant.signature}`}
                      alt="Applicant Signature"
                      className="applicant-img"
                    />
                  ) : (
                    'N/A'
                  )}
                </td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(applicant._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="14">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default App;

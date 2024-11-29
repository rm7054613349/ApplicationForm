import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Form.css'; // Import the CSS file

const ApplicantForm = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    dateOfBirth: '',
    gender: '',
    religion: '',
    casteCategory: '',
    address: '',
    country: '',
    state: '',
    district: '',
    hobbies: [],
  });
  const [newHobby, setNewHobby] = useState('');
  const [photo, setPhoto] = useState(null);
  const [signature, setSignature] = useState(null);

  // State to store dropdown options
  const [countries, setCountries] = useState([]);
  const [religions, setReligions] = useState(['Hindu', 'Muslim', 'Christian', 'Other']);
  const [castes, setCastes] = useState(['General', 'OBC', 'SC', 'ST']);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);

  // Fetch countries (example static data, replace with API call if needed)
  useEffect(() => {
    setCountries([
      { code: 'IN', name: 'India' },
      { code: 'US', name: 'USA' },
      { code: 'CA', name: 'Canada' }
    ]);
  }, []);

  // Fetch states based on country (replace with API call)
  useEffect(() => {
    if (formData.country === 'IN') {
      setStates([
        { code: 'MH', name: 'Maharashtra' },
        { code: 'GJ', name: 'Gujarat' },
        { code: 'KA', name: 'Karnataka' }
      ]);
    } else if (formData.country === 'US') {
      setStates([
        { code: 'CA', name: 'California' },
        { code: 'NY', name: 'New York' }
      ]);
    } else {
      setStates([]);
    }
  }, [formData.country]);

  // Fetch districts based on state (replace with API call)
  useEffect(() => {
    if (formData.state === 'MH') {
      setDistricts(['Mumbai', 'Pune', 'Nagpur']);
    } else if (formData.state === 'GJ') {
      setDistricts(['Ahmedabad', 'Surat', 'Vadodara']);
    } else if (formData.state === 'CA') {
      setDistricts(['Los Angeles', 'San Francisco']);
    } else if (formData.state === 'NY') {
      setDistricts(['Buffalo', 'Albany']);
    } else {
      setDistricts([]);
    }
  }, [formData.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'photo') setPhoto(files[0]);
    if (name === 'signature') setSignature(files[0]);
  };

  const handleAddHobby = () => {
    if (newHobby.trim()) {
      setFormData({ ...formData, hobbies: [...formData.hobbies, newHobby.trim()] });
      setNewHobby('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === 'hobbies') {
        data.append(key, JSON.stringify(formData[key]));
      } else {
        data.append(key, formData[key]);
      }
    });

    if (photo) data.append('photo', photo);
    if (signature) data.append('signature', signature);

    try {
      const response = await axios.post('http://localhost:5000/api/applicants', data);
      alert('Applicant registered successfully!');
      setFormData({
        name: '',
        fatherName: '',
        dateOfBirth: '',
        gender: '',
        religion: '',
        casteCategory: '',
        address: '',
        country: '',
        state: '',
        district: '',
        hobbies: [],
      });
      setPhoto(null);
      setSignature(null);
      onFormSubmit(); // Notify parent to refresh data
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit the form. Please try again.');
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
    
      <h2>Personal Details</h2>
      <div className="form-group">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} required />
        <input type="text" name="fatherName" placeholder="Father's Name" value={formData.fatherName} onChange={handleInputChange} required />
      </div>
      <div className="form-group">
        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} required />
        <select name="gender" value={formData.gender} onChange={handleInputChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="form-group">
        <select name="religion" value={formData.religion} onChange={handleInputChange} required>
          <option value="">Select Religion</option>
          {religions.map((religion) => (
            <option key={religion} value={religion}>{religion}</option>
          ))}
        </select>
        <select name="casteCategory" value={formData.casteCategory} onChange={handleInputChange} required>
          <option value="">Select Caste Category</option>
          {castes.map((caste) => (
            <option key={caste} value={caste}>{caste}</option>
          ))}
        </select>
      </div>
      <textarea name="address" placeholder="Address" value={formData.address} onChange={handleInputChange} required></textarea>
      <div className="form-group">
        <select name="country" value={formData.country} onChange={handleInputChange} required>
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>{country.name}</option>
          ))}
        </select>
        <select name="state" value={formData.state} onChange={handleInputChange} required>
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state.code} value={state.code}>{state.name}</option>
          ))}
        </select>
        <select name="district" value={formData.district} onChange={handleInputChange} required>
          <option value="">Select District</option>
          {districts.map((district) => (
            <option key={district} value={district}>{district}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <input type="text" placeholder="Add Hobby" value={newHobby} onChange={(e) => setNewHobby(e.target.value)} />
        <button type="button" onClick={handleAddHobby}>Add Hobby</button>
      </div>
      <ul className="hobby-list">
        {formData.hobbies.map((hobby, index) => (
          <li key={index}>{hobby}</li>
        ))}
      </ul>

      <div className="form-group">
        <label>Upload Photo</label>
        <input type="file" name="photo" onChange={handleFileChange} required />
      </div>
      <div className="form-group">
        <label>Upload Signature</label>
        <input type="file" name="signature" onChange={handleFileChange} required />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ApplicantForm;

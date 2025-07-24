import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    UName: '',
    UEmail: '',
    Password: '',
    PAdd1: '',
    PAdd2: '',
    Pincode: '',
    Contact: ''
  });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  // const history = useHistory();
  
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    axios.get('http://localhost:8082/profile', { withCredentials: true })
      .then(response => {
        if (response.data.success) {
          const user = response.data.user;
          setFormData({
            UName: user.UName,
            UEmail: user.UEmail,
            Password: '',
            PAdd1: user.PAdd1,
            PAdd2: user.PAdd2,
            Pincode: user.Pincode,
            Contact: user.Contact
          });
        } else {
          setErrorMessage('Failed to fetch user data');
        }
      })
      .catch(error => {
        console.error('Fetch user data error:', error);
        setErrorMessage('Error fetching user data');
      });
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.put('http://localhost:8082/editprofile', formData, { withCredentials: true })
      .then(response => {
        if (response.data.success) {
          setSuccessMessage('User data updated successfully');
          navigate('/Profile');
        } else {
          setErrorMessage('Failed to update user data');
        }
      })
      .catch(error => {
        console.error('Update user data error:', error);
        setErrorMessage('Error updating user data');
      });
  };

  return (
    <div className="container mt-5 mb-5">
  <div className="card mx-auto" style={{ maxWidth: '900px' }}>
    <div className="card-header">
      <h2 className="text-center">Edit Profile</h2>
    </div>
    <div className="card-body p-4" style={{ textAlign: 'left' }}>
      {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success" role="alert">{successMessage}</div>}
      {/* <form onSubmit={handleSubmit} className="px-4">
        <div className="mb-3 row">
          <label className="col-sm-4 col-form-label fs-5">Name:</label>
          <div className="col-sm-8">
            <input
              type="text"
              name="UName"
              className="form-control fs-5"
              value={formData.UName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-4 col-form-label fs-5">Email:</label>
          <div className="col-sm-8">
            <input
              type="email"
              name="UEmail"
              className="form-control fs-5"
              value={formData.UEmail}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-4 col-form-label fs-5">Address 1:</label>
          <div className="col-sm-8">
            <input
              type="text"
              name="PAdd1"
              className="form-control fs-5"
              value={formData.PAdd1}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-4 col-form-label fs-5">Address 2:</label>
          <div className="col-sm-8">
            <input
              type="text"
              name="PAdd2"
              className="form-control fs-5"
              value={formData.PAdd2}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-4 col-form-label fs-5">Pincode:</label>
          <div className="col-sm-8">
            <input
              type="number"
              name="Pincode"
              className="form-control fs-5"
              value={formData.Pincode}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-4 col-form-label fs-5">Contact:</label>
          <div className="col-sm-8">
            <input
              type="text"
              name="Contact"
              className="form-control fs-5"
              value={formData.Contact}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-dark mt-4 fs-5">Update Profile</button>
        </div>
      </form> */}
      <form onSubmit={handleSubmit} className="px-4">
  <div className="mb-3">
    <label className="form-label fs-5">Name:</label>
    <input
      type="text"
      name="UName"
      className="form-control fs-5"
      value={formData.UName}
      onChange={handleChange}
    />
  </div>
  <div className="mb-3">
    <label className="form-label fs-5">Email:</label>
    <input
      type="email"
      name="UEmail"
      className="form-control fs-5"
      value={formData.UEmail}
      onChange={handleChange}
    />
  </div>
  <div className="mb-3">
    <label className="form-label fs-5">Address 1:</label>
    <input
      type="text"
      name="PAdd1"
      className="form-control fs-5"
      value={formData.PAdd1}
      onChange={handleChange}
    />
  </div>
  <div className="mb-3">
    <label className="form-label fs-5">Address 2:</label>
    <input
      type="text"
      name="PAdd2"
      className="form-control fs-5"
      value={formData.PAdd2}
      onChange={handleChange}
    />
  </div>
  <div className="mb-3">
    <label className="form-label fs-5">Pincode:</label>
    <input
      type="number"
      name="Pincode"
      className="form-control fs-5"
      value={formData.Pincode}
      onChange={handleChange}
    />
  </div>
  <div className="mb-3">
    <label className="form-label fs-5">Contact:</label>
    <input
      type="text"
      name="Contact"
      className="form-control fs-5"
      value={formData.Contact}
      onChange={handleChange}
    />
  </div>
  <div className="text-start">
    <button type="submit" className="btn btn-dark mt-4 fs-5">Update Profile</button>
  </div>
</form>

    </div>
  </div>
</div>

  );
};

export default EditProfile;

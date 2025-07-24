


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [formData, setFormData] = useState({
//     UName: '',
//     UEmail: '',
//     Password: '',
//     PAdd1: '',
//     PAdd2: '',
//     Pincode: '',
//     Contact: ''
//   });
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const fetchUserData = () => {
//     axios.get('http://localhost:8082/profile', { withCredentials: true })
//       .then(response => {
//         if (response.data.success) {
//           const user = response.data.user;
//           setUser(user);
//           setFormData({
//             UName: user.UName,
//             UEmail: user.UEmail,
//             Password: '',
//             PAdd1: user.PAdd1,
//             PAdd2: user.PAdd2,
//             Pincode: user.Pincode,
//             Contact: user.Contact
//           });
//         } else {
//           setErrorMessage('Failed to fetch user data');
//         }
//       })
//       .catch(error => {
//         console.error('Fetch user data error:', error);
//         setErrorMessage('Error fetching user data');
//       });
//   };

//   const handleChange = e => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = e => {
//     e.preventDefault();
//     axios.put('http://localhost:8082/profile', formData, { withCredentials: true })
//       .then(response => {
//         if (response.data.success) {
//           setSuccessMessage('User data updated successfully');
//           fetchUserData();
//         } else {
//           setErrorMessage('Failed to update user data');
//         }
//       })
//       .catch(error => {
//         console.error('Update user data error:', error);
//         setErrorMessage('Error updating user data');
//       });
//   };

//   return (
//     <div>
//       <h2>User Profile</h2>
//       {errorMessage && <p className="error-message">{errorMessage}</p>}
//       {successMessage && <p className="success-message">{successMessage}</p>}
//       {user && (
//         <div>
//           <div>
//             <p><strong>Name:</strong> {user.UName}</p>
//             <p><strong>Email:</strong> {user.UEmail}</p>
//             <p><strong>Address Line 1:</strong> {user.PAdd1}</p>
//             <p><strong>Address Line 2:</strong> {user.PAdd2}</p>
//             <p><strong>Pincode:</strong> {user.Pincode}</p>
//             <p><strong>Contact:</strong> {user.Contact}</p>
//           </div>
//           <form onSubmit={handleSubmit}>
//             <h3>Edit Profile</h3>
//             <div>
//               <label>Name:</label>
//               <input
//                 type="text"
//                 name="UName"
//                 value={formData.UName}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <label>Email:</label>
//               <input
//                 type="email"
//                 name="UEmail"
//                 value={formData.UEmail}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <label>Password:</label>
//               <input
//                 type="password"
//                 name="Password"
//                 value={formData.Password}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <label>Address Line 1:</label>
//               <input
//                 type="text"
//                 name="PAdd1"
//                 value={formData.PAdd1}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <label>Address Line 2:</label>
//               <input
//                 type="text"
//                 name="PAdd2"
//                 value={formData.PAdd2}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <label>Pincode:</label>
//               <input
//                 type="number"
//                 name="Pincode"
//                 value={formData.Pincode}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <label>Contact:</label>
//               <input
//                 type="text"
//                 name="Contact"
//                 value={formData.Contact}
//                 onChange={handleChange}
//               />
//             </div>
//             <button type="submit">Update Profile</button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProfileDisplay = () => {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    axios.get('http://localhost:8082/profile', { withCredentials: true })
      .then(response => {
        if (response.data.success) {
          setUser(response.data.user);
        } else {
          setErrorMessage('Failed to fetch user data');
        }
      })
      .catch(error => {
        console.error('Fetch user data error:', error);
        setErrorMessage('Error fetching user data');
      });
  };

  return (
    <div className="container mt-5 mb-5">
  <div className="card mx-auto" style={{ maxWidth: '1000px' }}>
    <div className="card-header ">
      <h2 className="text-center">User Profile</h2>
    </div>
    <div className="card-body m-4">
      {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
      {user && (
        <div className="row">
          <div className="col-md-6 d-flex flex-column align-items-center">
            <div className="d-flex mb-3">
              <strong className="me-2 fs-5">Name:</strong>
              <span className='fs-5'>{user.UName}</span>
            </div>
            <div className="d-flex mb-3">
              <strong className="me-2 fs-5">Email:</strong>
              <span className='fs-5'>{user.UEmail}</span>
            </div>
            <div className="d-flex mb-3">
              <strong className="me-2 fs-5">Contact:</strong>
              <span className='fs-5'>{user.Contact}</span>
            </div>
          </div>
          <div className="col-md-6 d-flex flex-column align-items-center">
            <div className="d-flex mb-3">
              <strong className="me-2 fs-5">Address 1:</strong>
              <span className='fs-5'>{user.PAdd1}</span>
            </div>
            <div className="d-flex mb-3">
              <strong className="me-2 fs-5">Address 2:</strong>
              <span className='fs-5'>{user.PAdd2}</span>
            </div>
            <div className="d-flex mb-3">
              <strong className="me-2 fs-5">Pincode:</strong>
              <span className='fs-5'>{user.Pincode}</span>
            </div>
          </div>
          <div className="d-flex justify-content-center mt-4 w-100">
            <Link to="/EditProfile">
              <button className="btn btn-dark fs-5">Edit Profile</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  </div>
</div>


  );
};

export default ProfileDisplay;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [errorMessage, setErrorMessage] = useState('');

//   // Fetch user data on page load
//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const fetchUserData = () => {
//     axios.get('http://localhost:8082/profile')
//       .then(response => {
//         if (response.data.success) {
//           setUser(response.data.user);
//         } else {
//           setErrorMessage('Failed to fetch user data');
//         }
//       })
//       .catch(error => {
//         console.error('Fetch user data error:', error);
//         setErrorMessage('Error fetching user data');
//       });
//   };

//   return (
//     <div>
//       <h2>User Profile</h2>
//       {errorMessage && <p className="error-message">{errorMessage}</p>}
//       {user && (
//         <div>
//           <div>
//             <label>Name:</label>
//             <p>{user.UName}</p>
//           </div>
//           <div>
//             <label>Email:</label>
//             <p>{user.UEmail}</p>
//           </div>
//           <div>
//             <label>Password:</label>
//             <p>{user.Password}</p>
//           </div>
//           <div>
//             <label>Address Line 1:</label>
//             <p>{user.PAdd1}</p>
//           </div>
//           <div>
//             <label>Address Line 2:</label>
//             <p>{user.PAdd2}</p>
//           </div>
//           <div>
//             <label>Pincode:</label>
//             <p>{user.Pincode}</p>
//           </div>
//           <div>
//             <label>Contact:</label>
//             <p>{user.Contact}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import CloseButton from 'react-bootstrap/CloseButton';
// import backgroundImage from '../../Images/bbg.jpg';
// import './Style.css';

// const Signup = ({ history }) => {
//   console.log(history);
//   const [userData, setUserData] = useState({
//     UName: '',
//     UEmail: '',
//     Password: '',
//     PAdd1: '',
//     PAdd2: '',
//     Pincode: '',
//     Contact: '',
//   });

  
//   // const history = useHistory();

//   function sendData() {
//     axios.post("http://localhost:8082/signup_user", userData)
//       .then(response => {
//         if (response.status === 200) {
//           let d = response.data;
//           console.log(d);
//           console.log(response.status);
//           history.push('/Login');
//         }

//       })
//       .catch(error => {
//         console.error("Error sending data:", error);
//       });
//   }
// //   function sendData() {

// //     for (const key in userData) {
// //       if (!userData[key]) {
// //         console.error(`${key} is empty`);
// //         return;
// //       }
// //     }
// //   axios.post("http://localhost:8000/signup_user", userData)
// //     .then(response => {
// //       if (response.status === 200) {
// //         let d = response.data;
// //         console.log(d);
// //         console.log(response.status);
// //       }
// //     })
// //     .catch(error => {
// //       console.error("Error sending data:", error);
// //     });
// // }


//   return (
//     <>
//       <div className="form-container d-flex align-items-center justify-content-center p-4" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>

//         <form className="Auth-form" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
//           <div className="Auth-form-content">
//             <div className='cross2 float-end '>
//               <Link to="/">
//                 <CloseButton />
//               </Link>
//             </div>
//             <h1 className="form-title text-center">Sign Up</h1>
//             <div className="text-center">
//               Already registered?{" "}
//               <Link to="/Login">
//                 <span className="link-primary">Sign In</span>
//               </Link>
//             </div>
//             {/* <div className="form-group mt-3">
//               <label>User </label><br />
//               <input type="number" onChange={(e) => { setUserData({ ...userData, UID: e.target.value }) }} placeholder="e.g Jane Doe" className="form-control mt-1" required />
//             </div> */}
//             <div className="form-group mt-3">
//               <label>Full Name</label><br />
//               <input type="text" onChange={(e) => { setUserData({ ...userData, UName: e.target.value }) }} placeholder="e.g Jane Doe" className="form-control mt-1" required />
//             </div>
//             <div className="form-group mt-3">
//               <label>Email address</label>
//               <input type="email" onChange={(e) => { setUserData({ ...userData, UEmail: e.target.value }) }} placeholder="Email Address" className="form-control mt-1" required />
//             </div>
//             <div className="form-group mt-3">
//               <label>Password</label>
//               <input type="password" onChange={(e) => { setUserData({ ...userData, Password: e.target.value }) }} placeholder="Password" className="form-control mt-1" required />
//             </div>
//             <div className="form-group mt-3">
//               <label>Address 1</label>
//               <input type="text" onChange={(e) => { setUserData({ ...userData, PAdd1: e.target.value }) }} required className="form-control mt-1" placeholder="Enter Address 1" />
//             </div>
//             <div className="form-group mt-3">
//               <label>Address 2</label>
//               <input type="text" onChange={(e) => { setUserData({ ...userData, PAdd2: e.target.value }) }} className="form-control mt-1"
//                 placeholder="Enter Address 2" />
//             </div>
//             <div className="form-group mt-3">
//               <label>Pincode</label>
//               <input type="tel" onChange={(e) => { setUserData({ ...userData, Pincode: e.target.value }) }} required className="form-control mt-1"
//                 placeholder="Enter Pincode" />
//             </div>
//             <div className="form-group mt-3">
//               <label>Contact</label>
//               <input type="tel" onChange={(e) => { setUserData({ ...userData, Contact: e.target.value }) }} required className="form-control mt-1"
//                 placeholder="Enter Contact" />
//             </div>
//             <div className="d-grid gap-2 mt-4">
//             {/* <Link to="/Login"> */}
//               <button className="btn btn-primary" type="button" onClick={sendData} >Sign Up</button>
//               {/* </Link> */}
//             </div>
//             <p className="text-center mt-2 mb-2">Have an account? <Link to="/Login">Login</Link></p>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }

// export default Signup;


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CloseButton from 'react-bootstrap/CloseButton';
import backgroundImage from '../../Images/bbg.jpg';
import './Style.css';

const Signup = () => {
  const navigate = useNavigate(); // useNavigate hook
  const [userData, setUserData] = useState({
    UName: '',
    UEmail: '',
    Password: '',
    PAdd1: '',
    PAdd2: '',
    Pincode: '',
    Contact: '',
  });

  const handleChange = (event) => {
    setUserData(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const sendData = (event) => {
    event.preventDefault(); // Prevent the default form submission
    axios.post("http://localhost:8082/signup_user", userData)
      .then(response => {
        console.log("Response received:", response);
        navigate('/Login'); 
        // if (response.status === 200) {
        //   let d = response.data;
        //   console.log("Data saved:", d);
        //   navigate('/Login'); 
        // } 
        // if (response.status === 500 && response.data.error === "Failed to send verification email") {
        //   // setErrorMessage('There was an issue sending the verification email. Please try again later.');
        //   navigate('/Login'); 

        // }
        // else {
        //   console.error("Unexpected response status:", response.status);
          
        // }
      })
      .catch(error => {
        console.error("Error sending data:", error);
        navigate('/Login'); 
      });
  };

  return (
    <>
      <div className="form-container d-flex align-items-center justify-content-center p-4" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
        <form className="Auth-form" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }} onSubmit={sendData}>
          <div className="Auth-form-content">
            <div className='cross2 float-end '>
              <Link to="/">
                <CloseButton />
              </Link>
            </div>
            <h1 className="form-title text-center">Sign Up</h1>
            <div className="text-center">
              Already registered?{" "}
              <Link to="/Login">
                <span className="link-primary">Sign In</span>
              </Link>
            </div>
            <div className="form-group mt-3">
              <label>Full Name</label><br />
              <input type="text" name="UName" onChange={handleChange} placeholder="e.g Jane Doe" className="form-control mt-1" required />
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input type="email" name="UEmail" onChange={handleChange} placeholder="Email Address" className="form-control mt-1" required />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input type="password" name="Password" onChange={handleChange} placeholder="Password" className="form-control mt-1" required />
            </div>
            <div className="form-group mt-3">
              <label>Address 1</label>
              <input type="text" name="PAdd1" onChange={handleChange} required className="form-control mt-1" placeholder="Enter Address 1" />
            </div>
            <div className="form-group mt-3">
              <label>Address 2</label>
              <input type="text" name="PAdd2" onChange={handleChange} className="form-control mt-1" placeholder="Enter Address 2" />
            </div>
            <div className="form-group mt-3">
              <label>Pincode</label>
              <input type="tel" name="Pincode" onChange={handleChange} required className="form-control mt-1" placeholder="Enter Pincode" />
            </div>
            <div className="form-group mt-3">
              <label>Contact</label>
              <input type="tel" name="Contact" onChange={handleChange} required className="form-control mt-1" placeholder="Enter Contact" />
            </div>
            <div className="d-grid gap-2 mt-4">
              <button className="btn btn-primary" type="submit">Sign Up</button>
            </div>
            <p className="text-center mt-2 mb-2">Have an account? <Link to="/Login">Login</Link></p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;


// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import CloseButton from 'react-bootstrap/CloseButton';
// import backgroundImage from '../../Images/bbg.jpg';
// import './Style.css';

// const Signup = () => {
//   const navigate = useNavigate(); // useNavigate hook
//   const [userData, setUserData] = useState({
//     UName: '',
//     UEmail: '',
//     Password: '',
//     PAdd1: '',
//     PAdd2: '',
//     Pincode: '',
//     Contact: '',
//   });

//   const handleChange = (event) => {
//     setUserData(prev => ({ ...prev, [event.target.name]: event.target.value }));
//   };

//   const sendData = async (event) => {
//     event.preventDefault(); // Prevent the default form submission
//     try {
//       const response = await axios.post("http://localhost:8082/signup_user", userData);
//       console.log("Response received:", response);
//       if (response.status === 200) {
//         let d = response.data;
//         console.log("Data saved:", d);
//         navigate('/Login'); 
//       } else {
//         console.error("Unexpected response status:", response.status);
//         navigate('/Login'); 
//       }
//     } catch (error) {
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         console.error("Error response data:", error.response.data);
//         console.error("Error response status:", error.response.status);
//         console.error("Error response headers:", error.response.headers);
//       } else if (error.request) {
//         // The request was made but no response was received
//         console.error("Error request:", error.request);
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         console.error("Error message:", error.message);
//       }
//       console.error("Error config:", error.config);
//     }
//   };

//   return (
//     <>
//       <div className="form-container d-flex align-items-center justify-content-center p-4" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
//         <form className="Auth-form" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }} onSubmit={sendData}>
//           <div className="Auth-form-content">
//             <div className='cross2 float-end '>
//               <Link to="/">
//                 <CloseButton />
//               </Link>
//             </div>
//             <h1 className="form-title text-center">Sign Up</h1>
//             <div className="text-center">
//               Already registered?{" "}
//               <Link to="/Login">
//                 <span className="link-primary">Sign In</span>
//               </Link>
//             </div>
//             <div className="form-group mt-3">
//               <label>Full Name</label><br />
//               <input type="text" name="UName" onChange={handleChange} placeholder="e.g Jane Doe" className="form-control mt-1" required />
//             </div>
//             <div className="form-group mt-3">
//               <label>Email address</label>
//               <input type="email" name="UEmail" onChange={handleChange} placeholder="Email Address" className="form-control mt-1" required />
//             </div>
//             <div className="form-group mt-3">
//               <label>Password</label>
//               <input type="password" name="Password" onChange={handleChange} placeholder="Password" className="form-control mt-1" required />
//             </div>
//             <div className="form-group mt-3">
//               <label>Address 1</label>
//               <input type="text" name="PAdd1" onChange={handleChange} required className="form-control mt-1" placeholder="Enter Address 1" />
//             </div>
//             <div className="form-group mt-3">
//               <label>Address 2</label>
//               <input type="text" name="PAdd2" onChange={handleChange} className="form-control mt-1" placeholder="Enter Address 2" />
//             </div>
//             <div className="form-group mt-3">
//               <label>Pincode</label>
//               <input type="tel" name="Pincode" onChange={handleChange} required className="form-control mt-1" placeholder="Enter Pincode" />
//             </div>
//             <div className="form-group mt-3">
//               <label>Contact</label>
//               <input type="tel" name="Contact" onChange={handleChange} required className="form-control mt-1" placeholder="Enter Contact" />
//             </div>
//             <div className="d-grid gap-2 mt-4">
//               <button className="btn btn-primary" type="submit">Sign Up</button>
//             </div>
//             <p className="text-center mt-2 mb-2">Have an account? <Link to="/Login">Login</Link></p>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }

// export default Signup;


// import React, { useState } from 'react';
// import axios from 'axios';
// import CloseButton from 'react-bootstrap/CloseButton';
// import { Link } from 'react-router-dom';
// import { height } from '@fortawesome/free-solid-svg-icons/fa0';
// import backgroundImage from '../../Images/bgg.jpg';
// const Login = () => {
//   const [UEmail, setEmail] = useState('');
//   const [Password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');


  
//   const handleLogin = () => {
//     axios.post('http://localhost:8082/login_submit', { UEmail, Password })
//       .then(response => {
//         if (response.data.success) {
//           // console.log('Login successful');
//           setErrorMessage('Login successful');
//           // history.push('/');
//           // setErrorMessage('');
//         } else {
//           setErrorMessage(response.data.message);
//         }
//       })
//       .catch(error => {
//         console.error('Login error:', error);
//         setErrorMessage('Error during login');
//       });
//   };
//   // const textStyle = {
//   //   // background:'#F7CDE1' ,
//   //   background-Image:''
//   //   height:'100%',
//   // };
//   return (
//     <>
//       <div className="form-container d-flex align-items-center justify-content-center p-4"style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover',height:'650px' }}>

//         <form className="Auth-form" style={{ backgroundColor: 'rgba(255, 255, 255, 0.26)',width:'420px' }}>
//           <div className="Auth-form-content">
//           <div className='cross2 float-end '>
//           <Link to="/">
//             <CloseButton />
//           </Link>
//         </div>
//             <h1 className="form-title text-center">Sign In</h1>
//             <div className="text-center">
//               Not registered yet?{" "}
//               <Link to="/Signup">
//                 <span className="link-primary">Sign Up</span>
//               </Link>
//             </div>
//             <div className="form-group mt-3">
//               <label className="text-center">Email:</label>
//               <input type="text" value={UEmail} className="form-control mt-1" onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" required/>
//             </div>
//             <div className="form-group mt-3">
//               <label>Password:</label>
//               <input type="password" value={Password} className="form-control mt-1" onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required/>
//             </div>
//             <div className='form-group mb-4'>
//               <input type='checkbox' className=' custom-control custom-cheakbox' id='check' />
//               <label htmlFor='check' className='custom-input-label'>Remember me </label>
//             </div>
//             <div className="d-grid gap-2 mt-3">
//             <Link to="/"><button type="button" onClick={handleLogin} className="btn btn-primary">Login</button></Link>
//             </div>
//             {errorMessage && <p className="error-message">{errorMessage}</p>}
//             <p className="text-center mt-3">Forgot <Link to="/Signup">password?</Link></p>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Login;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, Navigate  } from 'react-router-dom';
// import CloseButton from 'react-bootstrap/CloseButton';
// import backgroundImage from '../../Images/bgg.jpg';

// const Login = () => {
//   const [UEmail, setEmail] = useState('');
//   const [Password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   // const history = useHistory();

//   const handleLogin = () => {
//     axios.post('http://localhost:8082/login_submit', { UEmail, Password })
//       .then(response => {
//         if (response.data.success) {
//           setErrorMessage('Login successful');
//           Navigate('/'); // Navigate to home page
//         } else {
//           setErrorMessage(response.data.message);
//         }
//       })
//       .catch(error => {
//         console.error('Login error:', error);
//         setErrorMessage('Error during login');
//       });
//   };

//   return (
//     <>
//       <div className="form-container d-flex align-items-center justify-content-center p-4" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', height: '650px' }}>
//         <form className="Auth-form" style={{ backgroundColor: 'rgba(255, 255, 255, 0.26)', width: '420px' }}>
//           <div className="Auth-form-content">
//             <div className='cross2 float-end '>
//               <Link to="/">
//                 <CloseButton />
//               </Link>
//             </div>
//             <h1 className="form-title text-center">Sign In</h1>
//             <div className="text-center">
//               Not registered yet?{" "}
//               <Link to="/Signup">
//                 <span className="link-primary">Sign Up</span>
//               </Link>
//             </div>
//             <div className="form-group mt-3">
//               <label className="text-center">Email:</label>
//               <input type="text" value={UEmail} className="form-control mt-1" onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" required />
//             </div>
//             <div className="form-group mt-3">
//               <label>Password:</label>
//               <input type="password" value={Password} className="form-control mt-1" onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required />
//             </div>
//             <div className='form-group mb-4'>
//               <input type='checkbox' className=' custom-control custom-cheakbox' id='check' />
//               <label htmlFor='check' className='custom-input-label'>Remember me </label>
//             </div>
//             <div className="d-grid gap-2 mt-3">
//               <button type="button" onClick={handleLogin} className="btn btn-primary">Login</button>
//             </div>
//             {errorMessage && <p className="error-message">{errorMessage}</p>}
//             <p className="text-center mt-3">Forgot <Link to="/Signup">password?</Link></p>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Login;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import CloseButton from 'react-bootstrap/CloseButton';
import backgroundImage from '../../Images/bgg.jpg';

const Login = () => {
  const [UEmail, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

axios.defaults.withCredentials = true;

// useEffect(()=>{
//   axios.get('http://localhost:8082/')
//   .then(res=>{
//     if(res.data.valid){
//       navigate('/')
//     }else{
//       navigate('/login')
//     }
//     console.log(res)
//   })
//   .catch(err=> console.log(err))
// },[])

  const handleLogin = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    axios.post('http://localhost:8082/login_submit', { UEmail, Password })
      .then(response => {
        if (response.data.success) {
          setErrorMessage('Login successful');
          navigate('/'); 
        } else {
          setErrorMessage(response.data.message);
        }
      })
      .catch(error => {
        console.error('Login error:', error);
        setErrorMessage('Error during login');
      });
  };

  return (
    <>
      <div className="form-container d-flex align-items-center justify-content-center p-4" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', height: '650px' }}>
        <form className="Auth-form" style={{ backgroundColor: 'rgba(255, 255, 255, 0.26)', width: '420px' }} onSubmit={handleLogin}>
          <div className="Auth-form-content">
            <div className='cross2 float-end '>
              <Link to="/">
                <CloseButton />
              </Link>
            </div>
            <h1 className="form-title text-center">Sign In</h1>
            <div className="text-center">
              Not registered yet?{" "}
              <Link to="/Signup">
                <span className="link-primary">Sign Up</span>
              </Link>
            </div>
            <div className="form-group mt-3">
              <label className="text-center">Email:</label>
              <input type="email" value={UEmail} className="form-control mt-1" onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" required />
            </div>
            <div className="form-group mt-3">
              <label>Password:</label>
              <input type="password" value={Password} className="form-control mt-1" onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required />
            </div>
            <div className='form-group mb-4'>
              <input type='checkbox' className='custom-control custom-checkbox' id='check' />
              <label htmlFor='check' className='custom-input-label'>Remember me </label>
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <p className="text-center mt-3">Forgot <Link to="/Signup">password?</Link></p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;

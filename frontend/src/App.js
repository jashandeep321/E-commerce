// import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from 'react-bootstrap/Carousel';
import Navbar from './Components/Navbar';
import Menubar from './Components/Menubar';
import Main from './Components/Main';
import Signup from './Components/pages/Signup';
import Login from './Components/pages/Login';
import Footer from './Components/Footer';
import Men from './Components/Shop/Men';
import Cart from './Components/pages/cart';
import Women from './Components/Shop/Women';
import Kids from './Components/Shop/Kids';
import Profile from './Components/pages/Profile';
import EditProfile from './Components/pages/EditProfile';
import ProductDisplay from './Components/ProductDisplay/ProductDisplay';
import React,{useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import Product from './Components/pages/Product';
// import VerifyEmail from './Components/VerifyEmail';
import './App.css';

function App() {
  const [cartCount, setCartCount] = useState(0);

  // Load initial cart count from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = storedCart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(totalItems);
  }, []);


  //   const handleAddToCart = (item) => {
  //   const cart = JSON.parse(localStorage.getItem('cart')) || [];

  //   const existingItemIndex = cart.findIndex(i => i.productID === item.productID);

  //   if (existingItemIndex !== -1) {
  //     cart[existingItemIndex].quantity += 1;
  //   } else {
  //     cart.push({ ...item, quantity: 1 });
  //   }

  //   localStorage.setItem('cart', JSON.stringify(cart));
  //   const newCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  //   setCartCount(newCount);
  // };


const handleAddToCart = (item) => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Use productID as the definitive identifier
  const productId = item.productID || item.id;
  
  if (!productId) {
    console.error('Product has no ID:', item);
    return;
  }

  const existingItemIndex = cart.findIndex(i => 
    String(i.productID) === String(productId) || String(i.id) === String(productId)
  );

  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity += 1;
  } else {
    cart.push({ 
      ...item, 
      quantity: 1,
      id: productId, // Ensure consistent ID
      productID: productId // Include both for backward compatibility
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  const newCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  setCartCount(newCount);
};


  return (
    // <Router>
    // <div className="App">
    //    <Navbar />
    //    <Menubar/>
      
    //    <Routes>
    //    <Route path='/' element={<Main/>}/>
    //    <Route path="/Signup" element={<Signup />} />
    //    <Route path="/Login" element={<Login />} />
    //    {/* <Route path="/men" element={<ShopCategory category="men"/>}/> */}
    //    {/* <Route path="/women" element={<women/>}/>
    //    <Route path="/kid" element={<kid/>}/>
    //    <Route path="/product" element={<Product/>}/> */}

    //    <Route path="/Cart" element={<Cart/>}/>
    //    {/* <Route path="/ProductDisplay" element={<ProductDisplay />} /> */}
      
    //   {/* </Route> */}
    //   </Routes>
    //   <Main/>
    //   <Footer/>
    // </div>
    // </Router>
    <Router>
      <div className="App">
        <Navbar />
        <Menubar/>
        <Routes>
        <Route path="/signup" element={<Signup />} />
          <Route path='/' element={<Main/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/Cart" element={<Cart/>}/>
          <Route path="/Men" element={<Men/>}/>
          <Route path="/Women" element={<Women/>}/>
          <Route path="/Kids" element={<Kids/>}/>
          <Route path="/Profile" element={<Profile/>}/>
          <Route path="/EditProfile" element={<EditProfile/>}/>
          {/* <Route path="/ProductDisplay" component={ProductDisplay} element={<ProductDisplay />} /> */}
          {/* <Route path="/PD" element={<PD/>}/> */}
          <Route path="/ProductDisplay/:productID" element={<ProductDisplay />} />
          {/* <Switch> <Route path="/verifyemail" component={VerifyEmail} /></Switch> */}
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;

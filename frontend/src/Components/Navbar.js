// import Container from 'react-bootstrap/Container';
// import Button from 'react-bootstrap/Button';
// import React, { useState, useEffect } from 'react';
// import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
// import { Form, Row, Col } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
// import cart_icon from '../Images/cart_icon.png';
// import { Link } from 'react-router-dom';

// function BasicExample() {
//   const [cartCount, setCartCount] = useState(0);

//   // Load cart count from localStorage on first render
//   useEffect(() => {
//     const storedCount = parseInt(localStorage.getItem('cartCount')) || 0;
//     setCartCount(storedCount);

//     // Listen for cart updates from other components (optional)
//     const handleStorageChange = () => {
//       const updatedCount = parseInt(localStorage.getItem('cartCount')) || 0;
//       setCartCount(updatedCount);
//     };
//     window.addEventListener('storage', handleStorageChange);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, []);

//   const handleSearch = () => {
//     console.log('Searching...');
//   };

//   return (
//     <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
//       <Container>
//         <Link to="/"><Navbar.Brand>Shopify</Navbar.Brand></Link>

//         <Nav className="me-auto">
//           <Nav.Link href="#home"></Nav.Link>
//           <Nav.Link href="#link"></Nav.Link>
//         </Nav>

//         <Form inline>
//           <Row>
//             <Col xs="auto" className='pe-0'>
//               <Form.Control
//                 type="text"
//                 placeholder="Search"
//                 className="mr-sm-2"
//               />
//             </Col>
//             <Col xs="auto" className="search-icon mt-1">
//               <FontAwesomeIcon icon={faSearch} onClick={handleSearch} />
//             </Col>
//             <Col>
//               <Link to="/Login">
//                 <div style={{
//                   border: '0.1rem solid #000000b5',
//                   borderRadius: '100px',
//                   width: '40px',
//                   height: '40px',
//                   justifyContent: 'center',
//                   alignContent: 'center',
//                   background: '#80808029'
//                 }}>
//                   <FontAwesomeIcon icon={faUser} style={{ height: '26px', color: '#000000b5' }} />
//                 </div>
//               </Link>
//             </Col>
//           </Row>
//         </Form>

//         <Col xs="auto" className='cart'>
//           <Link to="/Cart">
//             <img src={cart_icon} alt="cart" />
//             <div className='nav-cart-count'>{cartCount}</div>
//           </Link>
//         </Col>
//       </Container>
//     </Navbar>
//   );
// }

// export default BasicExample;


import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Form, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import cart_icon from '../Images/cart_icon.png';

function NavbarComponent() {
  const [cartCount, setCartCount] = useState(0);

  // Load initial cart count
  useEffect(() => {
    updateCartCount();
    
    // Listen for cart updates from other components
    window.addEventListener('storage', updateCartCount);
    
    return () => {
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  const updateCartCount = () => {
    try {
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      const count = storedCart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
    } catch (error) {
      console.error('Error updating cart count:', error);
    }
  };

  const handleSearch = () => {
    console.log('Searching...');
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
      <Container>
        <Link to="/" className="navbar-brand">Shopify</Link>

        <Nav className="me-auto">
          {/* Navigation links if needed */}
        </Nav>

        <Form inline>
          <Row>
            <Col xs="auto" className='pe-0'>
              <Form.Control
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
            </Col>
            <Col xs="auto" className="search-icon mt-1">
              <FontAwesomeIcon icon={faSearch} onClick={handleSearch} />
            </Col>
            <Col>
              <Link to="/Login">
                <div className="user-icon">
                  <FontAwesomeIcon icon={faUser} />
                </div>
              </Link>
            </Col>
          </Row>
        </Form>

        <div className="cart-icon">
          <Link to="/Cart">
            <img src={cart_icon} alt="cart" />
            {cartCount > 0 && <span className="nav-cart-count">{cartCount}</span>}
          </Link>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Form, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import cart_icon from '../Images/cart_icon.png';

function NavbarComponent() {
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page with the query as a parameter
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      // Optionally clear the search field after submission
      setSearchQuery('');
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
      <Container>
        <Link to="/" className="navbar-brand">Shopify</Link>

        <Nav className="me-auto">
          {/* Navigation links if needed */}
        </Nav>

        <Form inline onSubmit={handleSearch}>
          <Row>
            <Col xs="auto" className='pe-0'>
              <Form.Control
                type="text"
                placeholder="Search products..."
                className="mr-sm-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Col>
            <Col xs="auto" className="search-icon mt-1">
              <button 
                type="submit" 
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer' 
                }}
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
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
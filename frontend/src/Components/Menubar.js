import Container from 'react-bootstrap/Container';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBorderAll, faGear} from '@fortawesome/free-solid-svg-icons';
// import './styles.css'; // Import your custom CSS file for styling

function BasicExample() {
  // Function to handle search action
  const handleSearch = () => {
    // Add your search logic here
    console.log('Searching...');
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark">
    <Container>
      {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
      <Nav variant="underline" defaultActiveKey="/home" className="me-auto">
      <Link to="/Men" className="nav-link ps-5 pe-5 pt-0 pb-0">Men</Link>
          <Link to="/Women" className="nav-link ps-5 pe-5 pt-0 pb-0">Women</Link>
          <Link to="/Kids" className="nav-link ps-5 pe-5 pt-0 pb-0">Kids</Link>
      </Nav>
      <Link to="/Profile">
        <FontAwesomeIcon icon={faGear} style={{color: '#ffffffad'}}/>
      </Link>
    </Container>
  </Navbar>
  );
}

export default BasicExample;
// variant="underline"
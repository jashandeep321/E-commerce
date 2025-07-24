// import Container from 'react-bootstrap/Container';
// import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
// import { Form, Row, Col } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBorderAll, faSearch } from '@fortawesome/free-solid-svg-icons';


// function BasicExample() {
//   // Function to handle search action
//   const handleSearch = () => {
//     // Add your search logic here
//     console.log('Searching...');
//   };

//   return (
//     <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary"style={{ padding: '2px 10px'}}>
//       <Container>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//         <Nav variant="underline" className="me-auto">
//           <NavDropdown title="Fashion" id="basic-nav-dropdown">
//               <NavDropdown.Item href="#action/3.1">Men</NavDropdown.Item>
//               <NavDropdown.Item href="#action/3.2">Women</NavDropdown.Item>
//               <NavDropdown.Item href="#action/3.3">Kids</NavDropdown.Item>
//               <NavDropdown.Item href="#action/3.3">Accessories</NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item href="#action/3.4">
//                 Separated link
//               </NavDropdown.Item>
//             </NavDropdown>

//             <NavDropdown title="Beauty" id="basic-nav-dropdown">
//               <NavDropdown.Item href="#action/3.1">Makeup</NavDropdown.Item>
//               <NavDropdown.Item href="#action/3.2">Skincare</NavDropdown.Item>
//               <NavDropdown.Item href="#action/3.3">Haircare</NavDropdown.Item>
//               <NavDropdown.Item href="#action/3.1">Appliances</NavDropdown.Item>
//               <NavDropdown.Item href="#action/3.2">Fragrances</NavDropdown.Item>
              
//               <NavDropdown.Divider />
//               <NavDropdown.Item href="#action/3.4">
//                 Separated link
//               </NavDropdown.Item>
//             </NavDropdown>

//             <NavDropdown title="Dropdown" id="basic-nav-dropdown">
//               <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
//               <NavDropdown.Item href="#action/3.2">
//                 Another action
//               </NavDropdown.Item>
//               <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item href="#action/3.4">
//                 Separated link
//               </NavDropdown.Item>
//             </NavDropdown>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default BasicExample;


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
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Form, Nav, NavDropdown, Container, Button, Modal } from 'react-bootstrap';
import SearchComponent from './searchbar';
import { Link } from 'react-router-dom';
import PersonalProfile from '../pages/innerpage/dashboardpages/useracoount';

const Header = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility

  // Function to handle logout
  const logoutUser = () => {
    // Clear the 'loginUser' key from local storage
    localStorage.removeItem('loginUser');
    // Redirect the user to the login page
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-2">
      <Container>
        <Navbar.Brand href="#home">Project Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-around align-items-center">
          <Form inline className="mb-2 mb-lg-0 ">
            <Nav className="container-fluid">
              <SearchComponent />
            </Nav>
          </Form>
          <Nav className="ml-2">
            <Button onClick={() => setShowModal(true)}>User Account</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>

      {/* Modal component */}
      <Modal show={showModal} onHide={() => setShowModal(false)} dialogClassName="modal-dialog modal-dialog-end">
        <Modal.Header closeButton className='bg-info'>
          <Modal.Title>User Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PersonalProfile />
          <Container className='d-flex justify-content-between'>
          <Button  variant="outline-none" className='border-none bg-warning'>
          <Link to="/forgot-password" className="text-decoration-none d-block py-2 text-dark">
            
            <span className="ml-2"> Change Passowrd</span>
          </Link>
          </Button>
          <Button onClick={logoutUser} variant="outline-none" className='border-none bg-danger'>Logout</Button>
          </Container>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
};

export default Header;

import React, { useState } from 'react'
import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'
 import { useNavigate } from 'react-router-dom';
import { Navbar, Form, Nav, NavDropdown, Container, Button, Modal } from 'react-bootstrap';
import SearchComponent from '../components/searchbar';
import { Link } from 'react-router-dom';
import PersonalProfile from '../pages/innerpage/dashboardpages/useracoount';

const NewHeader = ({OpenSidebar}) => {
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
    <header className='header d-flex justify-content-around' >
        <div className='menu-icon' >
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
              <SearchComponent />
        </div>
        <div className='header-right'>
           <Nav className="ml-2">
           <Button onClick={() => setShowModal(true)} className="border-0 bg-transparent p-0">
            <img src={"https://images7.alphacoders.com/111/1112855.jpg"} alt="User Profile" style={{ width: 48, height: 42, borderRadius: '50%', filter: '90%' }} />
          </Button>
          </Nav>
        </div>

        {/* Modal component */}
      <Modal show={showModal} onHide={() => setShowModal(false)} dialogClassName="modal-dialog modal-dialog-end">
        <Modal.Header closeButton className='bg-secondary text-dark'>
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
    </header>
  )
}

export default NewHeader
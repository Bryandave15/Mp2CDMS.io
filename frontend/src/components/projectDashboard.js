// Dashboard.js

import React from 'react';
import Sidebar from './sidebar';
import Header from './header';  // Import the new Header component
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useEffect,} from 'react';
import Dashboard from '../pages/innerpage/dashboard';
import NewHeader from '../newtemplate/header';
import NewSidebar from '../newtemplate/sidebar';

const MainDashboard = () => {

  var navigate = useNavigate(); 
  useEffect( ()=>{
      const validateAccess = localStorage.getItem('loginUser');
      if(validateAccess == null){
        alert('You need to log in First.')
        navigate('/login');
      }
      
  }, []); 

  return (
    
    <Container fluid className="p-0 fluid">
  
      <Header />
      <Container fluid>
      <Row className="">
        <Col lg={2} className="bg-light sidebar p-0" >
          <Sidebar />
        </Col>
        <Col lg={10} className="content p-0">
        
          <h2>Main Content Area</h2>
          <Dashboard />
        </Col>
      </Row>
      </Container>
    </Container>
  );
};

export default MainDashboard;

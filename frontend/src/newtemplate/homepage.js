import React from 'react'
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useEffect,} from 'react';
import DashboardCard from '../pages/innerpage/dashboardpages/dashboardCards';
import DashboardTable from '../pages/innerpage/dashboardpages/dashboardTable';

const Home = () => {
  const navigate = useNavigate(); 
  useEffect( ()=>{
      const validateAccess = localStorage.getItem('loginUser');
      if(validateAccess == null){
        alert('You need to log in First.')  
        navigate('/login');
      }
      
  }, []); 
    
     

  return (
    <main className='main-container'>
        <Container >
          <DashboardCard />
        </Container>
        <Container> 
        <Container className='mt-4' >
     
          <DashboardTable />
        </Container>
        </Container>
    </main>
  )
}

export default Home
// Dashboard.js

import React from 'react';
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import NewHeader from '../newtemplate/header';
import NewSidebar from '../newtemplate/sidebar';
import { useNavigate } from 'react-router-dom';
import { useEffect,} from 'react';
import InspectionList from './innerpage/inspection'

const Todo = () => {

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  var navigate = useNavigate(); 
  useEffect( ()=>{
      const validateAccess = localStorage.getItem('loginUser');
      
      if(validateAccess == null){
        navigate('/login');
        alert('You need to log in first')
      }
      
  }, []); 

  return (
    <div className='grid-container'>
      <NewHeader OpenSidebar={OpenSidebar}/>
      <NewSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <InspectionList />
    </div>
  );
};

export default Todo;

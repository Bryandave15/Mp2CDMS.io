import React from 'react';
import { Link} from 'react-router-dom';

import { Container } from 'react-bootstrap';


const ForgotPassword = () => {



  return (
    <Container fluid  className='maincontainer' > 
      
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <div className="card shadow-lg border-0 rounded-lg mt-5">
              <div className="card-header bg-secondary">
                <h3 className="text-center text-white font-weight-light my-4">Forgot Password</h3>
              </div>
              <div className="card-body">
                <form id="registrationForm" >
                
                    
                      <div className="form-floating mb-3 mb-md-2">
                        <input className="form-control" name="firstname" type="text" placeholder="Enter your first name" />
                        <label htmlFor="inputFirstName">Email Adress</label>
                      </div>
                  
                 
                      <div className="form-floating mb-3 mb-md-2">
                        <input className="form-control" name="lastname" type="text" placeholder="Enter your last name" />
                        <label htmlFor="inputLastName">New Password</label>
                      </div>
                 
                 
                  <div className="form-floating mb-3">
                    <input className="form-control" name="" type="text" placeholder="username" />
                    <label htmlFor="inputEmail">Confirm New Password</label>
                  </div>
                
                
                  <div className="mt-4 mb-0">
                    <div className="d-grid"><button className="btn btn-danger btn-block"><Link to="/login" className="text-decoration-none d-block text-dark text-center mt-1">
                  <span className="ml-2"> Change Password</span>
                </Link></button></div>
                  </div>
                 <Container>
                 <Link to="/login" className="text-decoration-none d-block p-2 text-dark text-center mt-4">
                  <span className="ml-2"> Back to Login page</span>
                </Link>
                 </Container>
                </form>
              </div>
            </div>
          </div>
        </div>
      
   </Container>
  
  );
}

export default ForgotPassword;

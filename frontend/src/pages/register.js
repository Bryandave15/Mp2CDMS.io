import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const Register = () => {
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState([]);

  const processRegistration = (event) => {
    event.preventDefault();

    const webservice_api_url = 'http://localhost:5000/registration';

    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Validation
    const errors = [];
    if (!data.firstname || !data.lastname || !data.email || !data.password || !data.confirmPassword) {
      errors.push('Please input all fields.');
    }

    if (data.password !== data.confirmPassword) {
      errors.push('Password and Confirm Password do not match.');
    }

    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    const requestOption = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch(webservice_api_url, requestOption)
      .then(response => response.json())
      .then(data => {
        if (data.code === 'success') {
          console.log(data)
          alert(data.msg);
          event.target.reset();
          // navigate('/login');
        } else {
          alert(data.msg);
        }
      })
      .catch(error => {
        alert('Error something is wrong');
      });
  };

  return (
    <Container fluid className='maincontainer'>
      <div className="row justify-content-center">
        <div className="col-lg-5">
          <div className="card shadow-lg border-0 rounded-lg mt-5">
            <div className="card-header bg-secondary">
              <h3 className="text-center text-white font-weight-light my-4">Create Account</h3>
            </div>
            <div className="card-body">
              {validationErrors.length > 0 && (
                <div className="alert alert-danger p-2 text-center" role="alert">
                  {validationErrors.map((error, index) => (
                    <p key={index}>{error}</p>
                  ))}
                </div>
              )}
              <form id="registrationForm" onSubmit={processRegistration}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="form-floating mb-3 mb-md-0">
                      <input className="form-control" name="firstname" type="text" placeholder="Enter your first name" />
                      <label htmlFor="inputFirstName">First name</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input className="form-control" name="lastname" type="text" placeholder="Enter your last name" />
                      <label htmlFor="inputLastName">Last name</label>
                    </div>
                  </div>
                </div>
                <div className="form-floating mb-3">
                  <input className="form-control" name="" type="text" placeholder="username" />
                  <label htmlFor="inputEmail">Username</label>
                </div>
                <div className="form-floating mb-3">
                  <input className="form-control" name="email" type="email" placeholder="name@example.com" />
                  <label htmlFor="inputEmail">Email address</label>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="form-floating mb-3 mb-md-0">
                      <input className="form-control" name="password" type="password" placeholder="Create a password" />
                      <label htmlFor="inputPassword">Password</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating mb-3 mb-md-0">
                      <input className="form-control" name="confirmPassword" type="password" placeholder="Confirm password" />
                      <label htmlFor="inputPasswordConfirm">Confirm Password</label>
                    </div>
                  </div>
                </div>
                <div className="mt-4 mb-0">
                  <div className="d-grid"><button className="btn btn-success btn-block">Create Account</button></div>
                </div>
                <Container>
                  <Link to="/login" className="text-decoration-none d-block p-2 text-dark text-center mt-4">
                    <span className="ml-2"> Return to login page..</span>
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

export default Register;

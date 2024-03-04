import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import apiRequest from '../dataFetch/apiRequest';
import { useNavigate } from 'react-router-dom';
import {MDBInput}from 'mdb-react-ui-kit';
import { useEffect } from 'react';
import '../App.css'

const Login = () => {
  const navigate = useNavigate();
  const backendlink = "http://localhost:5000/login-validation";
  const [rememberMe, setRememberMe] = useState(false);
  const [usern, setUsername] = useState('');
  const [passw, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  
  // Retrieve username and password from local storage when component mounts
  useEffect(() => {
    const storedUsername = localStorage.getItem('rememberedUsername');
    const storedPassword = localStorage.getItem('rememberedPassword');
    if (storedUsername && storedPassword) {
      setUsername(storedUsername);
      setPassword(storedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();

    const objReq = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: "username=" + usern + "&password=" + passw,
    }

    const data = await apiRequest(backendlink, objReq);

    if (data.code === "success") {
      if (rememberMe) {
        // Store username and password in local storage if "Remember Me" is checked
        localStorage.setItem('rememberedUsername', usern);
        localStorage.setItem('rememberedPassword', passw);
      } else {
        // Clear remembered credentials from local storage if "Remember Me" is not checked
        localStorage.removeItem('rememberedUsername');
        localStorage.removeItem('rememberedPassword');
      }
      localStorage.setItem('loginUser', JSON.stringify(data.loginUser.username));
      navigate('/');
    } else {
      setErrMsg(data.msg)
    }
  }
    

  return (
    <Container fluid className='bg-dark  '> 
      <Row fluid className="align-items-center">
        <Col lg={3} fluid className='login-container bg-light align-items-center pb-5 ' >
          
          <div className='d-flex flex-column justify-content-center h-custom-1 w-80 pt-4'  style={{ fontFamily: 'Poppins, sans-serif'}}>
          <h2 className='text-center mb-2'> <b> LOGO</b></h2>
          <h2 className='text-center mb-5'> <b> CONSYST</b></h2>
          {errMsg && <p className="text-danger mt-3">{errMsg}</p>}
            <p className="fw-normal  text-center  pb-1 " style={{letterSpacing: '1px',}}> <b> Log in to your account</b></p>
            <Form onSubmit={handleLoginFormSubmit} >
            <MDBInput wrapperClass='mb-4  w-100' label='Username'  type='text' size="md" value={usern} onChange={(e) => setUsername(e.target.value)}/>
            <MDBInput  wrapperClass='mb-4  w-100' label='Password' id='formControlLg' type='password' size="md" value={passw} onChange={(e) => setPassword(e.target.value)}/>

            <Form.Group controlId="formBasicCheckbox" className='mb-4'>
                <Form.Check
                  type="checkbox"
                  label="Remember me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)} // Update rememberMe state
                />
              </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
           
            </Form>
            <p className="small mb-3 pb-lg-3 "><a class="text-muted" href="#!"><Link to="/forgot-password" className="text-decoration-none d-block p-2 text-dark  mt-2">
                  <span className="ml-2"> Forgot Password.</span>
                </Link></a></p>

                <p className="small mb-3 pb-lg-3 "><a class="text-muted" href="#!"><Link to="/register" className="text-decoration-none d-block p-2 text-dark text-center mt-2">
                  <span className="ml-2"> Dont have an account? Register here.</span>
                </Link></a></p>
          </div>
          
       
        
        </Col>
       
        <Col lg={9} fluid className='carousel-container d-none d-lg-block bg-dark'  >
          <Carousel data-bs-theme="light "  >
            <Carousel.Item>
            <img
            className="d-block w-100"
            src="https://i.pinimg.com/564x/6e/6c/1f/6e6c1fb26136471af677fc4892c67841.jpg"
            alt="jpg"
            style={{ maxWidth: '1460px', height: '725px', objectFit: 'cover' }}
        />
              <Carousel.Caption className='text-light text-center'>
              <h2>Introduction to Construction Management System</h2>
                <p>Achieve faster results for every project milestone with custom features like timesheets.<br /> An agile project management tool designed to support the entire project life cycle.</p>
                <br />
                <br />
                <br />
                <br />
                <br />
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="	https://i.pinimg.com/564x/c4/98/c1/c498c1f95eac1b36a3b756c698c41bfb.jpg"
                alt="jpg"
              />
              <Carousel.Caption mb-5>
                <h2>Introduction to Construction Management System</h2>
                <p>Achieve faster results for every project milestone with custom features like timesheets.<br /> An agile project management tool designed to support the entire project life cycle.</p>
                <br />
                <br />
                <br />
                <br />
                <br />
              </Carousel.Caption>
            </Carousel.Item>
            
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://i.pinimg.com/564x/13/0e/c4/130ec439dfe7af7f08cb0fe963da4161.jpg"
                alt="jpg"
              />
              <Carousel.Caption>
              <h2>Introduction to Construction Management System</h2>
                <p>Achieve faster results for every project milestone with custom features like timesheets.<br /> An agile project management tool designed to support the entire project life cycle.</p>
                <br />
                <br />
                <br />
                <br />
                <br />
              </Carousel.Caption>
            </Carousel.Item>
            
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://i.pinimg.com/564x/42/94/ee/4294eebffc02fbd0358a60f5e1942b51.jpg"
                alt="jpg"
              />
              <Carousel.Caption>
              <h2>Introduction to Construction Management System</h2>
                <p>Achieve faster results for every project milestone with custom features like timesheets.<br /> An agile project management tool designed to support the entire project life cycle.</p>
                <br />
                <br />
                <br />
                <br />
                <br />
              </Carousel.Caption>
            </Carousel.Item> 
            {/* Add other carousel items here */}
          </Carousel>
        </Col>
      </Row>
   </Container>
  
  );
}

export default Login;

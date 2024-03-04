import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Modal, Row, Table} from 'react-bootstrap';
import apiRequest from '../../dataFetch/apiRequest';
import { Link } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import ScheduleSearchComponent from './searchpage/schedule';



const ScheduleItem = () => {
  const [scheduleTitle, setScheduleTitle] = useState('');
  const [taskName, settaskName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [finishDate, setFinishDate] = useState('');
  const [status, setStatus] = useState('');
  
  const [show, setShow] = useState(false);
  const [allDrawing, setAllSchedule] = useState([]);
  const [butMode, setButMode] = useState('');
  const [butName, setButname] = useState('');
  const [itemId, setSetItemId] = useState('');
  const [error, setError] = useState('');

  const handleShow = () => {
    setButMode('create');
    setButname('Save');
    setShow(true);
    setScheduleTitle('');
    settaskName('');
    setStartDate('');
    setFinishDate('');
    setStatus('');
  };

  const handleClose = () => setShow(false);

  const handleSave = async () => {
    if (butMode === 'create') {
      if (
        scheduleTitle === '' ||
        taskName === '' ||
        startDate === '' ||
        finishDate === '' ||
        status === ''
      ) {
        // Set error message
        setError('Please fill out all text fields.');
        return;
      } else {
        // Clear error if no validation issue
        setError('');
      }

      const objReq = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `scheduleTitle=${scheduleTitle}&taskName=${taskName}&startDate=${startDate}&finishDate=${finishDate}&status=${status}`,
      };

      const data = await apiRequest('http://localhost:5000/save-schedule', objReq);
      console.log(data);

      if (data.code === 'success') {
        console.log('Ok save ');
      } else {
        console.log('Not save');
      }
      handleReadData();
      setShow(false);
    } else {
      //update process
      const objReq = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `scheduleTitle=${scheduleTitle}&taskName=${taskName}&startDate=${startDate}&finishDate=${finishDate}&status=${status}`,
      };

      const data = await apiRequest(`http://localhost:5000/update-schedule/${itemId}`, objReq);
      console.log(data);

      if (data.code === 'success') {
        console.log('Ok save ');
      } else {
        console.log('Not save');
      }
      handleReadData();
      setShow(false);
    }
  };

  const handleReadData = async () => {
    const response = await fetch('http://localhost:5000/get-schedule-data');
    const data = await response.json();
    console.log('check all todo', data);
    setAllSchedule(data);
  };

  useEffect(() => {
    handleReadData();
  }, []);

  //delete of todo
  const deleteSchedule = async (id) => {
    let text = `Are you sure to delete this?`;
    if (window.confirm(text) === true) {
      const objReq = { method: 'DELETE' };
      await apiRequest(`http://localhost:5000/delete-schedule/${id}`, objReq);
      handleReadData();
    }
  };

  const updateItem = async (id) => {
    setButMode('update');
    setButname('Update');
    setSetItemId(id);
    const response = await fetch(`http://localhost:5000/get-schedule/${id}`);
    const data = await response.json();

    console.log('check one todo', data);
    setScheduleTitle(data.scheduleTitle);
    settaskName(data.taskName);
    setStartDate(data.startDate);
    setFinishDate(data.finishDate);
    setStatus(data.status);
    setShow(true);
  };

  return (
    <main className='main-container'> 
      <Container className='mb-3' >
        
          <Container className='mb-3' style={{ borderBottom: '2px solid black' }}>
        <Stack direction='horizontal' gap={3}>
          <div className='p-2'>
            <h3> Schedule</h3>
          </div>
          <div className=''>
            <ul className='d-flex'>
              <li style={{ listStyleType: 'none', marginRight: '10px' }}>
                <Link to='#' className='text-decoration-none d-block py-2 text-dark'>
                  <span className='ml-2'> List</span>
                </Link>
              </li>
              <li style={{ listStyleType: 'none' }}>
                <Link to='#' className='text-decoration-none d-block py-2 text-dark'>
                  <span className='ml-2'> Recycle Bin</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className='p-2 ms-auto d-flex'>  
            <ScheduleSearchComponent />
          </div>
          <div className='p-2 ms-auto'>
            <Button variant='danger' onClick={handleShow} className=' mx-auto d-block'>
              Add Schedule +
            </Button>
          </div>
        </Stack>
      </Container>
      <Container className='mb-3' style={{ borderBottom: '2px solid black' }}>
            <Table responsive className='table table-light table-striped'>
              <thead className='text-center'>
                <tr>
                   <th>#</th>
                  <th>Title</th>
                  <th>Task Name</th>
                  <th>Date Start</th>
                  <th>Date Finish</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className='text-center align-items-center'>
                {allDrawing.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.scheduleTitle}</td>
                    <td>{item.taskName}</td>
                    <td>{item.startDate}</td>
                    <td>{item.finishDate}</td>
                    <td>{item.status}</td>
                    <td className=''>
                      <Button className='me-1' size='sm' variant='danger' onClick={() => deleteSchedule(item.id)} style={{ fontSize: '10px' }}>
                        Delete
                      </Button>
                      <Button className='' size='sm' variant='success' onClick={() => updateItem(item.id)} style={{ fontSize: '10px' }}>
                        Update
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Modal size='xl' aria-labelledby='contained-modal-title-vcenter' centered show={show} onHide={handleClose}>
              <Modal.Header closeButton className='bg-dark'>
                <Modal.Title className='text-light'>Add New Schedule
                </Modal.Title>
                
        
          
              </Modal.Header>
              <Modal.Body>
                {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                        )}
                <Form>
                  <Row className='mb-3'>
                    <Form.Group as={Col} className='mb-1' controlId='scheduleTitle'>
                      <Form.Label> Title</Form.Label>
                      <Form.Control required type='text' value={scheduleTitle} onChange={(e) => setScheduleTitle(e.target.value)} placeholder='Enter Inspection Name' />
                    </Form.Group>
                    <Form.Group as={Col} className='mb-1' controlId='taskName'>
                      <Form.Label>Task Name</Form.Label>
                      <Form.Control required type='text' value={taskName} onChange={(e) => settaskName(e.target.value)} placeholder='Enter Task' />
                    </Form.Group>
                  </Row>
                  <Row className='mb-3'>
                  <Form.Group as={Col} className='mb-3' controlId='exampleForm.ControlTextarea1'>
                    <Form.Label> Date Start</Form.Label>
                    <Form.Control type='date' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                  </Form.Group>
                  
                    <Form.Group as={Col} controlId='formGridEmail'>
                      <Form.Label>Date Finish</Form.Label>
                      <Form.Control type='Date' placeholder='date' value={finishDate} onChange={(e) => setFinishDate(e.target.value)} />
                    </Form.Group>
                  </Row>
                  <Form.Group className='mb-3' controlId='status'>
                    <Form.Label>Status</Form.Label>
                    <Form.Control type='text' placeholder='Status' value={status} onChange={(e) => setStatus(e.target.value)} />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>
                  Close
                </Button>
                <Button variant='primary' onClick={handleSave}>
                  {butName}
                </Button>
              </Modal.Footer>
            </Modal>
          
          
        
      </Container>
      </Container>
    </main>
  );
};

export default ScheduleItem;

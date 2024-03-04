import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Modal, Row, Table} from 'react-bootstrap';
import apiRequest from '../../dataFetch/apiRequest';
import { Link } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import MefpsSearchComponent from './searchpage/mefps';



const ReportList = () => {
  const [reportTitle, setReportTitle] = useState('');
  const [reportType, setReportType] = useState('');
  const [description, setdescription] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [dateCreated, setDateCreated] = useState('');
  const [attachment, setAttachment] = useState('');
  
  const [show, setShow] = useState(false);
  const [allReport, setAllReports] = useState([]);
  const [butMode, setButMode] = useState('');
  const [butName, setButname] = useState('');
  const [itemId, setSetItemId] = useState('');

  const handleShow = () => {
    setButMode('create');
    setButname('Save');
    setShow(true);
    setReportTitle('');
    setReportType('');
    setdescription('');
    setCreatedBy('');
    setDateCreated([]);
  };

  const handleClose = () => setShow(false);

  const handleSave = async () => {
    if (butMode === 'create') {
      if (reportTitle === '') {
        alert('Item Name is Empty, this is required');
        return;
      }

      const objReq = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // changed content type
        },
        body: JSON.stringify({
            reportTitle: reportTitle,
            reportType: reportType,
            description: description,
            createdBy: createdBy,
            dateCreated: dateCreated,
            attachment: attachment

        }),
    };

      const data = await apiRequest('http://localhost:5000/save-report', objReq);
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
            'Content-Type': 'application/json', // changed content type
        },
        body: JSON.stringify({
            reportTitle: reportTitle,
            reportType: reportType,
            description: description,
            createdBy: createdBy,
            dateCreated: dateCreated,
            attachment: attachment
        }),
    };

      const data = await apiRequest(`http://localhost:5000/update-report/${itemId}`, objReq);
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
    const response = await fetch('http://localhost:5000/get-report-data');
    const data = await response.json();
    console.log('check all todo', data);
    setAllReports(data);
  };

  useEffect(() => {
    handleReadData();
  }, []);

  //delete of todo
  const deleteReport = async (id) => {
    let text = `Are you sure to delete todo id number: ${id}?`;
    if (window.confirm(text) === true) {
      const objReq = { method: 'DELETE' };
      await apiRequest(`http://localhost:5000/delete-report/${id}`, objReq);
      handleReadData();
    }
  };

  const updateItem = async (id) => {
    setButMode('update');
    setButname('Update');
    setSetItemId(id);
    const response = await fetch(`http://localhost:5000/get-report/${id}`);
    const data = await response.json();

    console.log('check one todo', data);
    setReportTitle(data.reportTitle);
    setReportType(data.reportType);
    setdescription(data.description);
    setCreatedBy(data.createdBy);
    setDateCreated(data.dateCreated);
    setAttachment(data.attachment)
    setShow(true);
  };

  return (

    <main className='main-container'> 
    
    

      <Container className='mb-3' >
        
          <Container className='mb-3' style={{ borderBottom: '2px solid black' }}>
        <Stack direction='horizontal' gap={3}>
          <div className='p-2'>
            <h3> Reports</h3>
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
                  <span className='ml-2'> Archive</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className='p-2 ms-auto d-flex'>
            <MefpsSearchComponent />
          </div>
          <div className='p-2 ms-auto'>
            <Button variant='danger' onClick={handleShow} className=' mx-auto d-block'>
              Add Item +
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
                  <th>Report Type</th>
                  <th>Description</th>
                  <th>Created By</th>
                  <th>Date Created</th>
                  <th>Attachment</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className='text-center align-items-center' >
                {allReport.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.reportTitle}</td>
                    <td>{item.reportType}</td>
                    <td>{item.description}</td>
                    <td>{item.createdBy}</td>
                    <td>{item.dateCreated}</td>
                    <td>{item.attachment}</td>
                    <td className=''>
                     
                      <Button className='me-1' size='sm' variant='danger' onClick={() => deleteReport(item.id)} style={{ fontSize: '10px' }}>
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
                <Modal.Title className='text-light'>Add New Drawing</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Row className='mb-3'>
                    <Form.Group as={Col} className='mb-1' controlId='reportTitle'>
                      <Form.Label>Report Title</Form.Label>
                      <Form.Control required type='text' value={reportTitle} onChange={(e) => setReportTitle(e.target.value)} placeholder='Enter Report Title' />
                    </Form.Group>
                    <Form.Group as={Col} className='mb-1' controlId='reportType'>
                      <Form.Label>Report Type</Form.Label>
                      <Form.Control required type='text' value={reportType} onChange={(e) => setReportType(e.target.value)} placeholder='Enter Report Type' />
                    </Form.Group>
                  </Row>
                  <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
                    <Form.Label> Description</Form.Label>
                    <Form.Control value={description} onChange={(e) => setdescription(e.target.value)}  placeholder='Enter Description'/>
                  </Form.Group>
                  <Row className='mb-3'>
                    <Form.Group as={Col} controlId='formGridEmail'>
                      <Form.Label>Created By</Form.Label>
                      <Form.Control type='text' placeholder='Created By' value={createdBy} onChange={(e) => setCreatedBy(e.target.value)} />
                    </Form.Group>
                 
                  <Form.Group as={Col} className='mb-3' controlId='dateCreated'>
                    <Form.Label>Date Created</Form.Label>
                    <Form.Control type='Date' placeholder='Enter Date' value={dateCreated} onChange={(e) => setDateCreated(e.target.value)} />
                  </Form.Group>
                  </Row>
                  <Form.Group className='mb-3' controlId='dateCreated'>
                    <Form.Label>Attachment</Form.Label>
                    <Form.Control type='file' placeholder='Upload files' value={attachment} onChange={(e) => setAttachment(e.target.value)} />
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

export default ReportList;

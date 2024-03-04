import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Modal, Row, Table} from 'react-bootstrap';
import apiRequest from '../../../dataFetch/apiRequest';
import { Link } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import MefpsSearchComponent from '../searchpage/mefps';



const Structural = () => {
  const [drawingTitle, setDrawingTitle] = useState('');
  const [drawingCode, setDrawingCode] = useState('');
  const [drawingLocation, setDrawingLocation] = useState('');
  const [trade, setTrade] = useState('');
  const [uploadFiles, setUploadFiles] = useState('');
  
  const [show, setShow] = useState(false);
  const [allDrawing, setAllDrawings] = useState([]);
  const [butMode, setButMode] = useState('');
  const [butName, setButname] = useState('');
  const [itemId, setSetItemId] = useState('');

  const handleShow = () => {
    setButMode('create');
    setButname('Save');
    setShow(true);
    setDrawingTitle('');
    setDrawingCode('');
    setDrawingLocation('');
    setTrade('');
    setUploadFiles([]);
  };

  const handleClose = () => setShow(false);

  const handleSave = async () => {
    if (butMode === 'create') {
      if (drawingTitle === '') {
        alert('Item Name is Empty, this is required');
        return;
      }

      const objReq = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // changed content type
        },
        body: JSON.stringify({
            drawingTitle: drawingTitle,
            drawingCode: drawingCode,
            drawingLocation: drawingLocation,
            trade: trade,
            uploadFiles: uploadFiles
        }),
    };

      const data = await apiRequest('http://localhost:5000/save-mefps', objReq);
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
            drawingTitle: drawingTitle,
            drawingCode: drawingCode,
            drawingLocation: drawingLocation,
            trade: trade,
            uploadFiles: uploadFiles
        }),
    };

      const data = await apiRequest(`http://localhost:5000/update-mefps/${itemId}`, objReq);
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
    const response = await fetch('http://localhost:5000/get-mefps-data');
    const data = await response.json();
    console.log('check all todo', data);
    setAllDrawings(data);
  };

  useEffect(() => {
    handleReadData();
  }, []);

  //delete of todo
  const deleteDrawing = async (id) => {
    let text = `Are you sure to delete todo id number: ${id}?`;
    if (window.confirm(text) === true) {
      const objReq = { method: 'DELETE' };
      await apiRequest(`http://localhost:5000/delete-mefps/${id}`, objReq);
      handleReadData();
    }
  };

  const updateItem = async (id) => {
    setButMode('update');
    setButname('Update');
    setSetItemId(id);
    const response = await fetch(`http://localhost:5000/get-mefps/${id}`);
    const data = await response.json();

    console.log('check one todo', data);
    setDrawingTitle(data.drawingTitle);
    setDrawingCode(data.drawingCode);
    setDrawingLocation(data.drawingLocation);
    setTrade(data.trade);
    setUploadFiles(data.uploadFiles);
    setShow(true);
  };

  return (
    <main className='main-container'> 
  
    

      <Container className='mb-3' >
        
          <Container className='mb-3' style={{ borderBottom: '2px solid black' }}>
        <Stack direction='horizontal' gap={3}>
          <div className='p-2'>
            <h3> Drawings</h3>
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
                  <th>Code</th>
                  <th>Location</th>
                  <th>Trade</th>
                  <th>File Uploads</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className='text-center align-items-center' >
                {allDrawing.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.drawingTitle}</td>
                    <td>{item.drawingCode}</td>
                    <td>{item.drawingLocation}</td>
                    <td>{item.trade}</td>
                    <td>{item.uploadFiles}</td>
                    <td className=''>
                     
                      <Button className='me-1' size='sm' variant='danger' onClick={() => deleteDrawing(item.id)} style={{ fontSize: '10px' }}>
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
                    <Form.Group as={Col} className='mb-1' controlId='drawingTitle'>
                      <Form.Label>Drawing Title</Form.Label>
                      <Form.Control required type='text' value={drawingTitle} onChange={(e) => setDrawingTitle(e.target.value)} placeholder='Enter Inspection Name' />
                    </Form.Group>
                    <Form.Group as={Col} className='mb-1' controlId='drawingCode'>
                      <Form.Label>Drawing Code</Form.Label>
                      <Form.Control required type='text' value={drawingCode} onChange={(e) => setDrawingCode(e.target.value)} placeholder='Enter Inspection Code' />
                    </Form.Group>
                  </Row>
                  <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
                    <Form.Label> Drawing Location</Form.Label>
                    <Form.Control value={drawingLocation} onChange={(e) => setDrawingLocation(e.target.value)} />
                  </Form.Group>
                  <Row className='mb-3'>
                    <Form.Group as={Col} controlId='formGridEmail'>
                      <Form.Label>Trade</Form.Label>
                      <Form.Control type='text' placeholder='date' value={trade} onChange={(e) => setTrade(e.target.value)} />
                    </Form.Group>
                  </Row>
                  <Form.Group className='mb-3' controlId='uploadFiles'>
                    <Form.Label>Upload Files</Form.Label>
                    <Form.Control type='file' placeholder='Upload files' value={uploadFiles} onChange={(e) => setUploadFiles(e.target.value)} />
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

export default Structural;

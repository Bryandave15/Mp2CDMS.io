import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import apiRequest from '../../dataFetch/apiRequest';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import InspectionSearchComponent from './searchpage/inspection';

const InspectionList = () => {
  const [inspectionName, setInspectionName] = useState('');
  const [inspectionCode, setInspectionCode] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [trade, setTrade] = useState('');
  const [inspectionDate, setInspectionDate] = useState('');
  const [location, setLocation] = useState('');
  const [contractor, setContractor] = useState('');
  const [inspector, setInspector] = useState('');
  const [dateClosed, setDateClosed] = useState('');
  const [uploadFiles, setUploadFiles] = useState('');

  const [show, setShow] = useState(false);
  const [allTodo, setAllTodo] = useState([]);
  const [butMode, setButMode] = useState('');
  const [butName, setButname] = useState('');
  const [itemId, setSetItemId] = useState('');

  const handleShow = () => {
    setButMode('create');
    setButname('Save');
    setShow(true);
    setInspectionName('');
    setInspectionCode('');
    setItemDescription('');
    setTrade('');
    setInspectionDate('');
    setLocation('');
    setContractor('');
    setInspector('');
    setDateClosed('');
    setUploadFiles([]);
  };

  const handleClose = () => setShow(false);

  const handleSave = async () => {
    if (butMode === 'create') {
      if (inspectionName === '') {
        alert('Item Name is Empty, this is required');
        return;
      }
      const objReq = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `inspectionName=${inspectionName}&inspectionCode=${inspectionCode}&ItemDescription=${itemDescription}&trade=${trade}&inspectionDate=${inspectionDate}&location=${location}&contractor=${contractor}&inspector=${inspector}&dateClosed=${dateClosed}&uploadFiles=${uploadFiles}`,
      };

      const data = await apiRequest('http://localhost:5000/save-todo', objReq);
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
        body: `inspectionName=${inspectionName}&inspectionCode=${inspectionCode}&ItemDescription=${itemDescription}&trade=${trade}&inspectionDate=${inspectionDate}&location=${location}&contractor=${contractor}&inspector=${inspector}&dateClosed=${dateClosed}&uploadFiles=${uploadFiles}`,
      };

      const data = await apiRequest(`http://localhost:5000/update-todo/${itemId}`, objReq);
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
    const response = await fetch('http://localhost:5000/get-todo-data');
    const data = await response.json();
    console.log('check all todo', data);
    setAllTodo(data);
  };

  useEffect(() => {
    handleReadData();
  }, []);

  //delete of todo
  const deleteItem = async (id) => {
    let text = `Are you sure to delete todo id number: ${id}?`;
    if (window.confirm(text) === true) {
      const objReq = { method: 'DELETE' };
      await apiRequest(`http://localhost:5000/delete-todo/${id}`, objReq);
      handleReadData();
    }
  };

  const updateItem = async (id) => {
    setButMode('update');
    setButname('Update');
    setSetItemId(id);
    const response = await fetch(`http://localhost:5000/get-todo/${id}`);
    const data = await response.json();

    console.log('check one todo', data);
    setInspectionName(data.inspectionName);
    setInspectionCode(data.inspectionCode);
    setItemDescription(data.itemDescription);
    setTrade(data.trade);
    setInspectionDate(data.inspectionDate);
    setLocation(data.location);
    setContractor(data.contractor);
    setInspector(data.inspector);
    setDateClosed(data.dateClosed);
    setUploadFiles(data.uploadFiles);
    setShow(true);
  };

  return (
    <main className='main-container'> 
  
      <Container className='mb-3' style={{ borderBottom: '2px solid black' }}>
        <Stack direction='horizontal' gap={3}>
          <div className='p-2'>
            <h3>Inspection</h3>
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
            <InspectionSearchComponent />
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
            <th>Inspection Number</th>
            <th>Inspection Name</th>
            <th>Inspection Code</th>
            <th>Description</th>
            <th>Trade</th>
            <th>Inspection Date</th>
            <th>Location</th>
            <th>Contractor</th>
            <th>Inspector</th>
            <th>Date Closed</th>
            <th>File Uploads</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className='text-center align-items-center'>
          {allTodo.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.inspectionName}</td>
              <td>{item.inspectionCode}</td>
              <td>{item.itemDescription}</td>
              <td>{item.trade}</td>
              <td>{item.inspectionDate}</td>
              <td>{item.location}</td>
              <td>{item.contractor}</td>
              <td>{item.inspector}</td>
              <td>{item.dateClosed}</td>
              <td>{item.uploadFiles}</td>
              <td className=''>
                <Button className='mb-1' size='sm' variant='danger' onClick={() => deleteItem(item.id)} style={{ fontSize: '8px' }}>
                  Delete
                </Button>
                <Button className='' size='sm' variant='success' onClick={() => updateItem(item.id)} style={{ fontSize: '8px' }}>
                  Update
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </Container>

      <Modal size='xl' aria-labelledby='contained-modal-title-vcenter' centered show={show} onHide={handleClose}>
        <Modal.Header closeButton className='bg-dark'>
          <Modal.Title className='text-light'>Add New Inspection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className='mb-3'>
              <Form.Group as={Col} className='mb-1' controlId='inspectionName'>
                <Form.Label>Inspection Name</Form.Label>
                <Form.Control required type='text' value={inspectionName} onChange={(e) => setInspectionName(e.target.value)} placeholder='Enter Inspection Name' />
              </Form.Group>

              <Form.Group as={Col} className='mb-1' controlId='inspectionCode'>
                <Form.Label>Inspection Code</Form.Label>
                <Form.Control required type='text' value={inspectionCode} onChange={(e) => setInspectionCode(e.target.value)} placeholder='Enter Inspection Code' />
              </Form.Group>
            </Row>

            <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
              <Form.Label> Description</Form.Label>
              <Form.Control value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} />
            </Form.Group>

            <Row className='mb-3'>
              <Form.Group as={Col} controlId='formGridEmail'>
                <Form.Label>Trade</Form.Label>
                <Form.Control type='text' placeholder='Trade' value={trade} onChange={(e) => setTrade(e.target.value)} />
              </Form.Group>

              <Form.Group as={Col} controlId='formGridPassword'>
                <Form.Label>Inspection Date</Form.Label>
                <Form.Control type='date' placeholder='Enter Inspection Date' value={inspectionDate} onChange={(e) => setInspectionDate(e.target.value)} />
              </Form.Group>
            </Row>

            <Row className='mb-3'>
              <Form.Group as={Col} className='mb-3' controlId='formGridAddress1'>
                <Form.Label>Location</Form.Label>
                <Form.Control type='text' placeholder='Enter Location' value={location} onChange={(e) => setLocation(e.target.value)} />
              </Form.Group>

              <Form.Group as={Col} className='mb-3' controlId='formGridAddress1'>
                <Form.Label>Contractor</Form.Label>
                <Form.Control placeholder='Contractor Name' value={contractor} onChange={(e) => setContractor(e.target.value)} />
              </Form.Group>
            </Row>

            <Row className='mb-3'>
              <Form.Group as={Col} className='mb-3' controlId='formGridAddress2'>
                <Form.Label>Inspector</Form.Label>
                <Form.Control placeholder='Enter Inspector' value={inspector} onChange={(e) => setInspector(e.target.value)} />
              </Form.Group>

              <Form.Group as={Col} className='mb-3' controlId='formGridAddress2'>
                <Form.Label>Date Closed</Form.Label>
                <Form.Control type='date' placeholder='Enter Date Closed' value={dateClosed} onChange={(e) => setDateClosed(e.target.value)} />
              </Form.Group>
            </Row>

            <Form.Group className='mb-3' controlId='uploadFiles'>
              <Form.Label>Uplaod Files</Form.Label>
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
      </main>
  );
};

export default InspectionList;

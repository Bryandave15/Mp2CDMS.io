import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    Button, 
    Col, 
    Container, 
    Form, 
    Modal, 
    Row, 
    Stack, 
    Table 
} from 'react-bootstrap';
import apiRequest from '../../dataFetch/apiRequest';
import MeetingSearchResultModal from './searchpage/meetingModal';

const MeetingList = () => {
    const [title, setTitle] = useState('');
    const [overview, setOverview] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [agenda, setAgenda] = useState('');
    const [mom, setMom] = useState('');
    
    const [show, setShow] = useState(false);
    const [allMeeting, setAllMeeting] = useState([]);
    const [butMode, setButMode] = useState('');
    const [butName, setButName] = useState('');
    const [itemId, setItemId] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchModal, setShowSearchModal] = useState(false);

    const handleShow = () => {
        setButMode('create');
        setButName('Save');
        setShow(true);
        setTitle('');
        setOverview('');
        setDate('');
        setLocation('');
        setAgenda('');
        setMom('');
    };

    const handleClose = () => setShow(false);

    const handleSave = async () => {
        const url = butMode === 'create' ? 'http://localhost:5000/save-meeting' : `http://localhost:5000/update-meeting/${itemId}`;
        const reqBody = `title=${title}&overview=${overview}&date=${date}&location=${location}&agenda=${agenda}&mom=${mom}`;

        const objReq = {
            method: butMode === 'create' ? 'POST' : 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: reqBody,
        };

        const data = await apiRequest(url, objReq);

        if (data.code === 'success') {
            console.log('Ok save ');
        } else {
            console.log('Not save');
        }

        handleReadData();
        setShow(false);
    };

    const handleReadData = async () => {
        const response = await fetch('http://localhost:5000/get-meeting-data');
        const data = await response.json();
        setAllMeeting(data);
    };

    useEffect(() => {
        handleReadData();
    }, []);

    const deleteItem = async (id) => {
        const text = `Are you sure to delete todo id number: ${id}?`;
        if (window.confirm(text)) {
            const objReq = { method: 'DELETE' };
            await apiRequest(`http://localhost:5000/delete-meeting/${id}`, objReq);
            handleReadData();
        }
    };

    const updateItem = async (id) => {
        setButMode('update');
        setButName('Update');
        setItemId(id);
        const response = await fetch(`http://localhost:5000/get-meeting/${id}`);
        const data = await response.json();

        setTitle(data.title);
        setOverview(data.overview);
        setDate(data.date);
        setLocation(data.location);
        setAgenda(data.agenda);
        setMom(data.mom);

        setShow(true);
    };

    const handleSearch = () => {
        const filteredMeetings = allMeeting.filter(
            (meeting) =>
                meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                meeting.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
                meeting.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
                meeting.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                meeting.agenda.toLowerCase().includes(searchQuery.toLowerCase()) ||
                meeting.mom.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filteredMeetings);
        setShowSearchModal(true);
    };

    return (
        <main className='main-container'> 
      
            <Container className='mb-3' style={{ borderBottom: '2px solid black' }}>
                <Stack direction='horizontal' gap={3} className=''>
                    <div className='p-2'>
                        <h3>Meetings</h3>
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
                        <Form.Control
                            size='md'
                            type='search'
                            placeholder='Search here'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Button variant='primary' onClick={handleSearch}>
                            Search
                        </Button>
                        <MeetingSearchResultModal
                            show={showSearchModal}
                            handleClose={() => setShowSearchModal(false)}
                            searchResults={searchResults}
                        />
                    </div>
                    <div className='p-2 ms-auto'>
                        <Button variant='danger' onClick={handleShow} className=' mx-auto d-block'>
                            {' '}
                            Add Meeting +
                        </Button>
                    </div>
                </Stack>
            </Container>

            <Container className='mb-3' style={{ borderBottom: '2px solid black' }}>
            <Table responsive className='table table-light table-striped'>
                <thead className='text-center'>
                    <tr>
                        <th>Meeting Number</th>
                        <th >Title</th>
                        <th >Overview</th>
                        <th >Date</th>
                        <th >Location</th>
                        <th >Agenda</th>
                        <th > MOM</th>
                        <th >Action</th>
                    </tr>
                </thead>
                <tbody className='text-center align-items-center'>
                    {allMeeting.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.overview}</td>
                            <td>{item.date}</td>
                            <td>{item.location}</td>
                            <td>{item.agenda}</td>
                            <td>{item.mom}</td>
                            <td className=''>
                                <Button
                                    style={{ fontSize: '10px' }}
                                    className='me-1'
                                    size='sm'
                                    variant='danger'
                                    onClick={() => deleteItem(item.id)}>
                                    Delete
                                </Button>
                                <Button
                                    style={{ fontSize: '10px' }}
                                    className=''
                                    size='sm'
                                    variant='success'
                                    onClick={() => updateItem(item.id)}>
                                    Update
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </Container>

            <Modal
                size='xl'
                aria-labelledby='contained-modal-title-vcenter'
                centered
                show={show}
                onHide={handleClose}>
                <Modal.Header closeButton className='text-dark bg-dark'>
                    <Modal.Title className='text-light'>Add New Meeting</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className='mb-3'>
                            <Form.Group as={Col} className='mb-1' controlId='title'>
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    required
                                    type='text'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder='Meeting Title'
                                />
                            </Form.Group>

                            <Form.Group as={Col} className='mb-1' controlId='overview'>
                                <Form.Label>Overview</Form.Label>
                                <Form.Control
                                    required
                                    type='text'
                                    value={overview}
                                    onChange={(e) => setOverview(e.target.value)}
                                    placeholder='Meeting Description'
                                />
                            </Form.Group>
                        </Row>
                        <Row className='mb-3'>
                        <Form.Group as={Col}  className='mb-3' controlId='exampleForm.ControlTextarea1'>
                            <Form.Label> Date</Form.Label>
                            <Form.Control type='date' value={date} onChange={(e) => setDate(e.target.value)} placeholder='Date'/>
                        </Form.Group>

                        <Form.Group as={Col} controlId=''>
                                <Form.Label>Location</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Location'
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </Form.Group>
                        </Row>

                        <Row className='mb-3'>
                            

                            <Form.Group as={Col} controlId='formGridPassword'>
                                <Form.Label>Agenda</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Meeting Agenda'
                                    value={agenda}
                                    onChange={(e) => setAgenda(e.target.value)}
                                />
                            </Form.Group>
                        </Row>

                        <Row className='mb-3'>
                            <Form.Group as={Col} className='mb-3' controlId='formGridAddress1'>
                                <Form.Label>MOM</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Minutes of the Meeting'
                                    value={mom}
                                    onChange={(e) => setMom(e.target.value)}
                                />
                            </Form.Group>
                        </Row>
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

export default MeetingList;

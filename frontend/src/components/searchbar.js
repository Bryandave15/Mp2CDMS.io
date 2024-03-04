import React, { useState } from 'react';
import { Form, Button, Container, ListGroup, Modal } from 'react-bootstrap';

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false); // Added state to track searching status
  const [showModal, setShowModal] = useState(false); 

// Function to handle search
const handleSearch = (event) => {
  event.preventDefault();
    if (!searchTerm.trim()) return; // search empty dont proceed
  
    setSearching(true); 
  
    // Make API requests to fetch all database
    Promise.all([
      fetch('http://localhost:5000/get-meeting-data').then(response => response.json()),
      fetch('http://localhost:5000/get-structural-data').then(response => response.json()),
      fetch('http://localhost:5000/get-todo-data').then(response => response.json()),
      fetch('http://localhost:5000/get-schedule-data').then(response => response.json()),
      fetch('http://localhost:5000/get-archi-data').then(response => response.json()),
      fetch('http://localhost:5000/get-mefps-data').then(response => response.json()),
      fetch('http://localhost:5000/get-asbuilt-data').then(response => response.json()),

    ])
      .then(([meetingData, structuralData,todoData,scheduleData, archiData, mefpsData, asbuiltData]) => {
        // Filter  data based on search term
        const filteredMeetingData = meetingData.filter(item =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
       
        const filteredStructuralData = structuralData.filter(item =>
            item.drawingTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.drawingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.drawingLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.trade.toLowerCase().includes(searchTerm.toLowerCase()) 
        );

        const filteredarchiData = archiData.filter(item =>
          item.drawingTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.drawingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.drawingLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.trade.toLowerCase().includes(searchTerm.toLowerCase()) 
      );
        const filteredmefpsData = mefpsData.filter(item =>
          item.drawingTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.drawingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.drawingLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.trade.toLowerCase().includes(searchTerm.toLowerCase()) 
      );
        const filteredasbuiltData = asbuiltData.filter(item =>
          item.drawingTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.drawingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.drawingLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.trade.toLowerCase().includes(searchTerm.toLowerCase()) 
      );
        
        const filteredtodoData = todoData.filter(item =>
          item.inspectionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.inspectionCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.itemDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.trade.toLowerCase().includes(searchTerm.toLowerCase()) 
          );
        
          const filteredScheduleData = scheduleData.filter(item =>
            item.scheduleTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.taskName.toLowerCase().includes(searchTerm.toLowerCase())
          );


    
  
        // Combine all data and set search results in state
        setSearchResults([...filteredMeetingData, ...filteredStructuralData, ...filteredtodoData, ...filteredScheduleData, ...filteredarchiData, ...filteredmefpsData, ...filteredasbuiltData]);
    
        setShowModal(true);
      })
      .catch(error => console.error('Error searching:', error))
      .finally(() => {
        setSearching(false); // Reset searching status in no ntohing in search
      });
  };
  return (
    <Container >
      <Form className='d-flex' onSubmit={handleSearch} >
        <Form.Group controlId="searchForm " >
          <Form.Control
            type="text"
            placeholder="Enter search term"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type='submit' disabled={searching}>
          {searching ? 'Searching...' : 'Search'} 
        </Button>
      </Form>

      {/* Modal for displaying search results */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Search Results</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {searchResults.length === 0 ? (
                <p>No results found</p>
            ) : (
                <ListGroup>
                {searchResults.map((result, index) => (
                    <ListGroup.Item key={index}>
                    <div>
                        <p>ID: {result.id}</p>
                        {result.title && <p>Meeting Title: {result.title}</p>}
                        {result.drawingTitle && <p>Drawing Title: {result.drawingTitle}</p>}
                        {result.inspectionName && <p>Inspection Name: {result.inspectionName}</p>}
                        {result.scheduleTitle && <p>Schedule Title: {result.scheduleTitle}</p>}
                        {/* Render other relevant properties */}
                    </div>
                    </ListGroup.Item>
                ))}
                </ListGroup>
            )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SearchComponent;

import React, { useState } from 'react';
import { Form, Button, Container, ListGroup, Modal } from 'react-bootstrap';

const ScheduleSearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [sescheduleng, setSescheduleng] = useState(false); // Added state to track sescheduleng status
  const [showModal, setShowModal] = useState(false); // State to control the visibility of the modal

// Function to handle search
const handleSearch = () => {
    // If search term is empty, do not proceed with the search
    if (!searchTerm.trim()) return;
  
    setSescheduleng(true); // Set sescheduleng status to true
  
    // Make API requests to fetch all meeting and schedule data

     Promise.all([
      
      fetch('http://localhost:5000/get-schedule-data').then(response => response.json())

    ])
      .then(([scheduleData]) => {
        
    
        // Filter schedule data based on search term
        const filteredscheduleData = scheduleData.filter(item =>
            item.scheduleTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.taskName.toLowerCase().includes(searchTerm.toLowerCase())

          );
    
  
        // Combine both meeting and schedule data and set search results in state
        setSearchResults([...filteredscheduleData]);
        // Show the modal
        setShowModal(true);
      })
      .catch(error => console.error('Error sescheduleng:', error))
      .finally(() => {
        setSescheduleng(false); // Reset sescheduleng status to false when search is completed
      });
  };
  return (
    <Container >
      <Form className='d-flex' >
        <Form.Group controlId="searchForm " >
          <Form.Control
            type="text"
            placeholder="Enter search term"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSearch} disabled={sescheduleng}>
          {sescheduleng ? 'Sescheduleng...' : 'Search'}
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
                        {result.scheduleTitle && <p>Schedule Title: {result.scheduleTitle}</p>}
                        {result.scheduleTitle && <p>Task Namee: {result.scheduleTitle}</p>}
                        {result.startDate && <p>Date Start: {result.startDate}</p>}
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

export default ScheduleSearchComponent;

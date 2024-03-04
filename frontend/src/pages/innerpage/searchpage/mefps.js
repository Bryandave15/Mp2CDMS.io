import React, { useState } from 'react';
import { Form, Button, Container, ListGroup, Modal } from 'react-bootstrap';

const MefpsSearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [semefpsng, setSemefpsng] = useState(false); // Added state to track semefpsng status
  const [showModal, setShowModal] = useState(false); // State to control the visibility of the modal

// Function to handle search
const handleSearch = () => {
    // If search term is empty, do not proceed with the search
    if (!searchTerm.trim()) return;
  
    setSemefpsng(true); // Set semefpsng status to true
  
    // Make API requests to fetch all meeting and mefps data

     Promise.all([
      
      fetch('http://localhost:5000/get-mefps-data').then(response => response.json())

    ])
      .then(([mefpsData]) => {
        
    
        // Filter mefps data based on search term
        const filteredmefpsData = mefpsData.filter(item =>
            item.drawingTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.drawingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.drawingLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.trade.toLowerCase().includes(searchTerm.toLowerCase()) 
          );
    
  
        // Combine both meeting and mefps data and set search results in state
        setSearchResults([...filteredmefpsData]);
        // Show the modal
        setShowModal(true);
      })
      .catch(error => console.error('Error semefpsng:', error))
      .finally(() => {
        setSemefpsng(false); // Reset semefpsng status to false when search is completed
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
        <Button variant="primary" onClick={handleSearch} disabled={semefpsng}>
          {semefpsng ? 'Semefpsng...' : 'Search'}
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
                        {result.drawingTitle && <p>Drawing Title: {result.drawingTitle}</p>}
                        {result.drawingCode && <p>Drawing Code: {result.drawingCode}</p>}
                        {result.trade && <p>Trade: {result.trade}</p>}
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

export default MefpsSearchComponent;

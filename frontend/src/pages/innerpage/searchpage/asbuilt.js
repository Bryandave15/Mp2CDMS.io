import React, { useState } from 'react';
import { Form, Button, Container, ListGroup, Modal } from 'react-bootstrap';

const AsbuiltSearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [seasbuiltng, setSeasbuiltng] = useState(false); // Added state to track seasbuiltng status
  const [showModal, setShowModal] = useState(false); // State to control the visibility of the modal

// Function to handle search
const handleSearch = () => {
    // If search term is empty, do not proceed with the search
    if (!searchTerm.trim()) return;
  
    setSeasbuiltng(true); // Set seasbuiltng status to true
  
    // Make API requests to fetch all meeting and asbuilt data

     Promise.all([
      
      fetch('http://localhost:5000/get-asbuilt-data').then(response => response.json())

    ])
      .then(([asbuiltData]) => {
        
    
        // Filter asbuilt data based on search term
        const filteredasbuiltData = asbuiltData.filter(item =>
            item.drawingTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.drawingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.drawingLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.trade.toLowerCase().includes(searchTerm.toLowerCase()) 
          );
    
  
        // Combine both meeting and asbuilt data and set search results in state
        setSearchResults([...filteredasbuiltData]);
        // Show the modal
        setShowModal(true);
      })
      .catch(error => console.error('Error seasbuiltng:', error))
      .finally(() => {
        setSeasbuiltng(false); // Reset seasbuiltng status to false when search is completed
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
        <Button variant="primary" onClick={handleSearch} disabled={seasbuiltng}>
          {seasbuiltng ? 'Seasbuiltng...' : 'Search'}
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

export default AsbuiltSearchComponent;

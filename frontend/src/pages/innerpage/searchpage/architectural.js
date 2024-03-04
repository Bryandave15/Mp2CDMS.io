import React, { useState } from 'react';
import { Form, Button, Container, ListGroup, Modal } from 'react-bootstrap';

const ArchiSearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false); // Added state to track searching status
  const [showModal, setShowModal] = useState(false); // State to control the visibility of the modal

// Function to handle search
const handleSearch = (event) => {

  event.preventDefault(); // Prevent default form submission behavior
    // If search term is empty, do not proceed with the search
    if (!searchTerm.trim()) return;
  
    setSearching(true); // Set searching status to true
  
    // Make API requests to fetch all meeting and archi data

     Promise.all([
      
      fetch('http://localhost:5000/get-archi-data').then(response => response.json())

    ])
      .then(([archiData]) => {
        
    
        // Filter archi data based on search term
        const filteredarchiData = archiData.filter(item =>
            item.drawingTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.drawingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.drawingLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.trade.toLowerCase().includes(searchTerm.toLowerCase()) 
          );
    
  
        // Combine both meeting and archi data and set search results in state
        setSearchResults([...filteredarchiData]);
        // Show the modal
        setShowModal(true);
      })
      .catch(error => console.error('Error searching:', error))
      .finally(() => {
        setSearching(false); // Reset searching status to false when search is completed
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

export default ArchiSearchComponent;

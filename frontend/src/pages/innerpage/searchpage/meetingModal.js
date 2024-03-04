// SearchResultModal.js

import { Modal, Button } from 'react-bootstrap';

const SearchResultModal = ({ show, handleClose, searchResults }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Search Results</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((meeting) => (
              <li key={meeting.id}>
                <p><b>Meeting ID: {meeting.id}</b></p>
                <p>Meeting Title: {meeting.title}</p>
                <p>Meeting Overview: {meeting.overview}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SearchResultModal;

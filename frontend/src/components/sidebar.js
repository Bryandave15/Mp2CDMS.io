// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faCog, faCoffee, faBuilding, faSearch, faEnvelope, faFileAlt, } from '@fortawesome/free-solid-svg-icons';
import '../App.css';

const Sidebar = () => {
  return (
    <nav id="sidebar" className="bg-dark">
      <div className="sidebar-header text-center">
        <h3 className="text-light">Dashboard</h3>
      </div>

      <ul className="list-unstyled components">
        <li>
          <Link to="/" className="text-decoration-none d-block py-2 text-light">
            <FontAwesomeIcon icon={faHome} size="lg" />
            <span className="ml-2"> Home</span>
          </Link>
          <hr className="bg-light my-1" />
        </li>

        <li>
          <Link to="/meeting" className="text-decoration-none d-block py-2 text-light">
            <FontAwesomeIcon icon={faCoffee} size="lg" />
            <span className="ml-2"> Meetings</span>
          </Link>
          <hr className="bg-light my-1" />
        </li>

        <li>
          <Link to="/drawing" className="text-decoration-none d-block py-2 text-light">
            <FontAwesomeIcon icon={faBuilding} size="lg" />
            <span className="ml-2"> Drawing / Plans</span>
          </Link>
          <hr className="bg-light my-1" />

        </li>
            
        <li>
          <Link to="/inspection" className="text-decoration-none d-block py-2 text-light">
            <FontAwesomeIcon icon={faSearch} size="lg" />
            <span className="ml-2"> Inspection</span>
          </Link>
          <hr className="bg-light my-1" />
        </li>

        

        <li>
          <Link to="/schedule" className="text-decoration-none d-block py-2 text-light">
            <FontAwesomeIcon icon={faEnvelope} size="lg" />
            <span className="ml-2"> Schedules</span>
          </Link>
          <hr className="bg-light my-1" />
        </li>
        <li>
          <Link to="/report" className="text-decoration-none d-block py-2 text-light">
            <FontAwesomeIcon icon={faFileAlt} size="lg" />
            <span className="ml-2"> Reports</span>
          </Link>
          <hr className="bg-light my-1" />
        </li>
        
        <li>
          <Link to="/inspection" className="text-decoration-none d-block py-2 text-light">
            <FontAwesomeIcon icon={faUsers} size="lg" />
            <span className="ml-2"> Directory</span>
          </Link>
          <hr className="bg-light my-1" />
        </li>

        <li>
          <Link to="/todo" className="text-decoration-none d-block py-2 text-light">
            <FontAwesomeIcon icon={faCog} size="lg" />
            <span className="ml-2">To do</span>
          </Link>
          <hr className="bg-light my-1" />
        </li>

        <li>
          <Link to="/inspection" className="text-decoration-none d-block py-2 mt-5 text-light">
            <FontAwesomeIcon icon={faCog} size="lg" />
            <span className="ml-2 ">Log out</span>
          </Link>
          <hr className="bg-light my-1" />
        </li>
        {/* Add more items as needed */}
      </ul>
    </nav>
  );
};

export default Sidebar;

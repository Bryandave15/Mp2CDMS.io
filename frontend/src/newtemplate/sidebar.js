import React from 'react'
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
 from 'react-icons/bs'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faCog, faCoffee, faBuilding, faSearch, faEnvelope, faFileAlt, } from '@fortawesome/free-solid-svg-icons';

function NewSidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <h2>CDMS</h2>
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <Link to="/" className="text-decoration-none d-block  text-light">
                <FontAwesomeIcon icon={faHome} size="lg" />
                <span className="ml-2"> Home</span>
                </Link>
            </li>

            <li className='sidebar-list-item'>
                <Link to="/meeting" className="text-decoration-none d-block  text-light">
                <FontAwesomeIcon icon={faCoffee} size="lg" />
                <span className="ml-2"> Meetings</span>
                </Link>
            </li>

            <li className='sidebar-list-item'>
                <Link to="/drawing" className="text-decoration-none d-block text-light">
                <FontAwesomeIcon icon={faBuilding} size="lg" />
                <span className="ml-2"> Drawing / Plans</span>
                 </Link>
            </li>
            
            <li className='sidebar-list-item'>
                <Link to="/inspection" className="text-decoration-none d-block  text-light">
                <FontAwesomeIcon icon={faSearch} size="lg" />
                <span className="ml-2"> Inspection</span>
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/schedule" className="text-decoration-none d-block  text-light">
                <FontAwesomeIcon icon={faEnvelope} size="lg" />
                <span className="ml-2"> Schedules</span>
                </Link>
            </li>

            <li className='sidebar-list-item'>
                <Link to="/report" className="text-decoration-none d-block  text-light">
                <FontAwesomeIcon icon={faFileAlt} size="lg" />
                <span className="ml-2"> Reports</span>
          </Link>
            </li>
            {/* <li className='sidebar-list-item'>
                <Link to="/inspection" className="text-decoration-none d-block  text-light">
                <FontAwesomeIcon icon={faUsers} size="lg" />
                <span className="ml-2"> Directory</span>
                </Link>
            </li>

            <li className='sidebar-list-item'>
                <Link to="/inspection" className="text-decoration-none d-block  text-light">
                <FontAwesomeIcon icon={faUsers} size="lg" />
                <span className="ml-2"> Settings</span>
                </Link>
            </li> */}

            <li className='sidebar-list-item'>
                <Link to="/login" className="text-decoration-none d-block  text-light">
                <FontAwesomeIcon icon={faUsers} size="lg" />
                <span className="ml-2"> Log Out</span>
                </Link>
            </li>

        </ul>
    </aside>
  )
}

export default NewSidebar
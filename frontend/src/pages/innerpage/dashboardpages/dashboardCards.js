import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faCog, faCoffee, faBuilding, faSearch, faEnvelope, faFileAlt, } from '@fortawesome/free-solid-svg-icons';
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'
const DashboardCard = () => {
  const [counts, setCounts] = useState({
    meeting: 0,
    structural: 0,
    todo: 0,
    schedule: 0,
    archi: 0,
    mefps: 0,
    asbuilt: 0,
    report: 0
  });
  const [lastUpdated, setLastUpdated] = useState({
    meeting: '',
    structural: '',
    todo: '',
    schedule: '',
    archi: '',
    mefps: '',
    asbuilt: '',
    repror: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          meetingData,
          structuralData,
          todoData,
          scheduleData,
          archiData,
          mefpsData,
          asbuiltData,
          report,
        ] = await Promise.all([
          fetch('http://localhost:5000/get-meeting-data').then(response => response.json()),
          fetch('http://localhost:5000/get-structural-data').then(response => response.json()),
          fetch('http://localhost:5000/get-todo-data').then(response => response.json()),
          fetch('http://localhost:5000/get-schedule-data').then(response => response.json()),
          fetch('http://localhost:5000/get-archi-data').then(response => response.json()),
          fetch('http://localhost:5000/get-mefps-data').then(response => response.json()),
          fetch('http://localhost:5000/get-asbuilt-data').then(response => response.json()),
          fetch('http://localhost:5000/get-report-data').then(response => response.json()),
        ]);

        const newCounts = {
          meeting: meetingData.length,
          structural: structuralData.length,
          todo: todoData.length,
          schedule: scheduleData.length,
          archi: archiData.length,
          mefps: mefpsData.length,
          asbuilt: asbuiltData.length,
          report: report.length
        };

        setCounts(newCounts);
        const currentTime = new Date().toLocaleString();
        setLastUpdated({
          meeting: currentTime,
          structural: currentTime,
          todo: currentTime,
          schedule: currentTime,
          archi: currentTime,
          mefps: currentTime,
          asbuilt: currentTime,
          report: currentTime,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
     

      <CardGroup className=' my-2 text-center pt-1' style={{ borderTop: '2px solid black' }}>
        <Card className='bg-danger me-1 ms-1'>
          <Card.Body>
            <Card.Title><h5> Meetings <FontAwesomeIcon icon={faCoffee} size="sm" /></h5></Card.Title>
            <Card.Text className=''> <hr />
           <h2> Total Meetings: {counts.meeting}</h2>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted"> Last updated: {lastUpdated.meeting}</small>
          </Card.Footer>
        </Card>

        <Card className='bg-warning me-1 ms-1'>
          <Card.Body>
            <Card.Title><h5> Drawing <FontAwesomeIcon icon={faCoffee} size="sm" /></h5></Card.Title><hr />
            <Card.Text>
              Total number of drawings: {counts.structural + counts.archi + counts.mefps + counts.asbuilt}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted"> Last updated: {lastUpdated.structural}</small>
          </Card.Footer>
        </Card>

        <Card className='bg-success me-1 ms-1'>
       
          <Card.Body>
            <Card.Title>Inspection</Card.Title>
            <hr/>
            <Card.Text>
              Total number of inspections: {counts.todo}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted"> Last updated: {lastUpdated.todo}</small>
          </Card.Footer>
        </Card>

        
      </CardGroup>
      <CardGroup className='text-center pb-1' style={{ borderBottom: '2px solid black' }}>
      <Card className='bg-primary me-1 ms-1'>
     
          <Card.Body>
            <Card.Title>Schedule</Card.Title><hr />
            <Card.Text>
              Total number of schedules: {counts.schedule}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted"> Last updated: {lastUpdated.schedule}</small>
          </Card.Footer>
        </Card>
        <Card className='bg-info me-1 ms-1'>

          <Card.Body>
            <Card.Title>Report</Card.Title><hr />
            <Card.Text>
              Total number of reports: {counts.report}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted"> Last updated: {lastUpdated.report}</small>
          </Card.Footer>
        </Card>

       
      </CardGroup>
    
    </Container>
  );
}

export default DashboardCard;

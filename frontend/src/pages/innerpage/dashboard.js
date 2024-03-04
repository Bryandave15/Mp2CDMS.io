import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

import { Container } from 'react-bootstrap';
import DashboardTable from './dashboardpages/dashboardTable';
import DashboardCard from './dashboardpages/dashboardCards';

const Dashboard = () => {
  return (
    <div className='container'>
    
      <Container> 
        <DashboardCard />
      </Container>
      <Container>
          <Container> latest added</Container>
          <DashboardTable />
 
      </Container>
    </div>

    
    

  );
}

export default Dashboard;
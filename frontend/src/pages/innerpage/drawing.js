import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Structural from './drawingSubpages/structural';
import Mefps from './drawingSubpages/mefps';
import Architectural from './drawingSubpages/architectural';
import Asbuilt from './drawingSubpages/asbuilt';


const DrawingList = () => {
 

  return (
    <main className='main-container'>
    <Tabs
      defaultActiveKey="profile"
      id="fill-tab-example"
      className="mb-3"
      fill
    >
      <Tab eventKey="Structural" title="Structural">
        <Structural />
      </Tab>
      <Tab eventKey="Architectural" title="Architectural">
        <Architectural />
      </Tab>
      <Tab eventKey="MEFPS" title="MEFPS">
        <Mefps />
      </Tab>
      <Tab eventKey="AS-Built" title="AS-BUILT">
        <Asbuilt />
      </Tab>
    </Tabs>
    </main>
  );
};

export default DrawingList;

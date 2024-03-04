import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

const DashboardTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:5000/get-meeting-data').then(response => response.json()),
      fetch('http://localhost:5000/get-structural-data').then(response => response.json()),
      fetch('http://localhost:5000/get-todo-data').then(response => response.json()),
      fetch('http://localhost:5000/get-schedule-data').then(response => response.json()),
      fetch('http://localhost:5000/get-archi-data').then(response => response.json()),
      fetch('http://localhost:5000/get-mefps-data').then(response => response.json()),
      fetch('http://localhost:5000/get-asbuilt-data').then(response => response.json()),
    ])
    .then(([meetingData, structuralData, todoData, scheduleData, archiData, mefpsData, asbuiltData]) => {
      // Combine data from all endpoints
      const combinedData = [
        ...meetingData.map(item => ({...item, type: 'Meeting'})),
        ...structuralData.map(item => ({...item, type: 'Structural'})),
        ...todoData.map(item => ({...item, type: 'Todo'})),
        ...scheduleData.map(item => ({...item, type: 'Schedule'})),
        ...archiData.map(item => ({...item, type: 'Archi'})),
        ...mefpsData.map(item => ({...item, type: 'Mefps'})),
        ...asbuiltData.map(item => ({...item, type: 'Asbuilt'}))
      ];
      setData(combinedData);
    })
    .catch(error => console.error('Error fetching data:', error));
  }, []); // Empty dependency array to run effect only once

  const columns = [
    { dataField: 'id', text: 'ID', sort: true },
    {
      dataField: 'title',
      text: 'Title',
      sort: false,
      formatter: (cell, row) => {
        const title = row.title || '';
        const drawingTitle = row.drawingTitle || '';
        const inspectionName = row.inspectionName || '';
        const scheduleTitle = row.scheduleTitle || '';

        return `${title}${drawingTitle}${inspectionName}${scheduleTitle}`;
      }
    },
    {
      dataField: 'type',
      text: 'Type',
      sort: false, 
    }
  ];

  return (
    <Container >
      <h3 className='text-center text-dark bg-warning 'style={{ borderBottom: '2px solid black' }}> Latest Added</h3>
      <BootstrapTable
        bootstrap5
        classes='text-center table-striped '
        keyField="id"
        data={data}
        columns={columns}
        pagination={paginationFactory({ sizePerPage: 5 })}
      />
    </Container>
  );
};

export default DashboardTable;

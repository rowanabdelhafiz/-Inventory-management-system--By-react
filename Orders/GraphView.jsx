import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/navbar.jsx';

const GraphView = () => {
  const { color } = useParams();
  const [graphUrl, setGraphUrl] = useState('');
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Fetch the graph URL and table data based on the color parameter
    axios.get(`http://127.0.0.1:5000/get_graph?color=${color}`)
      .then(response => {
        // Set the graph URL and table data from the response data
        setGraphUrl(response.data.graphUrl);
        setTableData(response.data.tableData); // assuming tableData is part of the response
      })
      .catch(error => {
        console.error('Error fetching graph:', error);
      });
  }, [color]);

  const structuredData = {
    numberOfBars: ['Bar 1', 'Bar 2', 'Bar 3', 'Bar 4', 'Bar 5', 'Bar 6', 'Bar 7', 'Bar 8', 'Bar 9', 'Bar 10'],
    totalLengthUsed: [
      'Used 60cm out of 60cm', 'Used 50cm out of 60cm', 'Used 40cm out of 60cm',
      'Used 30cm out of 60cm', 'Used 20cm out of 60cm', 'Used 10cm out of 60cm',
      'Used 50cm out of 60cm', 'Used 40cm out of 60cm', 'Used 30cm out of 60cm',
      'Used 20cm out of 60cm'
    ],
    cuttingPlane: [
      'Cut 20 cm, cut 20 cm, cut 20cm', 'Cut 10 cm, cut 20 cm, cut 20cm', 'Cut 20 cm, cut 20 cm',
      'Cut 10 cm, cut 10 cm, cut 10cm', 'Cut 5 cm, cut 5 cm, cut 10cm', 'Cut 2 cm, cut 3 cm, cut 5cm',
      'Cut 15 cm, cut 20 cm, cut 15cm', 'Cut 10 cm, cut 10 cm, cut 20cm', 'Cut 5 cm, cut 10 cm, cut 15cm',
      'Cut 10 cm, cut 10 cm'
    ]
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.content}>
        <h1 style={styles.title}>Graph View - {color}</h1>
        <div style={styles.mainContent}>
          {graphUrl && (
            <div style={styles.graphContainer}>
              <img 
                src={graphUrl} 
                alt={`Graph for color ${color}`} 
                style={styles.graphImage}
              />
            </div>
          )}
          <div style={styles.descriptionContainer}>
            <table style={styles.descriptionTable}>
              <thead>
                <tr>
                  <th style={styles.headerCell}>Number of bars</th>
                  <th style={styles.headerCell}>Total length used</th>
                  <th style={styles.headerCell}>Cutting plane</th>
                </tr>
              </thead>
              <tbody>
                {structuredData.numberOfBars.map((bar, index) => (
                  <tr key={index}>
                    <td style={styles.descriptionCell}>{bar}</td>
                    <td style={styles.descriptionCell}>{structuredData.totalLengthUsed[index]}</td>
                    <td style={styles.descriptionCell}>{structuredData.cuttingPlane[index]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#f0f2f5',
    fontFamily: 'Arial, sans-serif',
  },
  content: {
    flex: '1',
    padding: '20px',
  },
  title: {
    fontSize: '2.5em',
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
  },
  mainContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  graphContainer: {
    flex: '0 0 auto',
    marginRight: '250px',
  },
  graphImage: {
    width: '100%',
    height: 'auto',
    maxWidth: '1000px',
    maxHeight: '600px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginLeft: '250px',
  },
  descriptionContainer: {
    flex: '1',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    // Ensures it is on the right side with a margin
  },
  descriptionTable: {
    width: '100%',
    borderCollapse: 'collapse',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  headerCell: {
    padding: '15px 20px',
    textAlign: 'left',
    backgroundColor: '#4CAF50',
    color: '#fff',
    fontSize: '1.2em',
    borderBottom: '1px solid #eee',
  },
  descriptionCell: {
    padding: '15px 20px',
    textAlign: 'left',
    backgroundColor: '#f9f9f9', // Adds some background color for styling
    fontSize: '1.1em',
    lineHeight: '1.6',
    color: '#555',
    borderBottom: '1px solid #eee',
  },
};

export default GraphView;

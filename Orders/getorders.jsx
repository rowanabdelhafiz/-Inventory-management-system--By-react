import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BsGraphUp, BsTrash } from 'react-icons/bs';
import Navbar from '../Navbar/navbar';
import Chart from 'chart.js/auto';

const styles = {
  container: {
    width: '80%',
    height: '100%',
    overflow: 'auto',
    marginLeft: '250px',
    padding: '20px',
  },
  tableWrapper: {
    maxHeight: 'calc(100vh - 200px)',
    overflowY: 'auto',
  },
  table: {
    borderCollapse: 'collapse',
    width: '100%',
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
  },
  tableCell: {
    border: '1px solid #dddddd',
    textAlign: 'left',
    padding: '8px',
  },
  tableRow: {
    borderBottom: '1px solid #dddddd',
  },
  buttonViewGraph: {
    padding: '5px 10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '5px',
  },
  buttonDelete: {
    padding: '5px 10px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  buttonAddOrder: {
    marginTop: '10px',
    padding: '5px 10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  chartContainer: {
    flex: '1',
  },
};

function GetOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios.get('http://127.0.0.1:5000/process_orders')
      .then(response => {
        setOrders(response.data);
        renderGraph(response.data);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  };

  const handleDeleteOrder = async (color) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/process_orders/${color}`);
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const renderGraph = (data) => {
    // Render graph logic
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <h1>All Orders</h1>
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.tableCell}>Color</th>
              <th style={styles.tableCell}>Parent Width</th>
              <th style={styles.tableCell}>Child Rolls</th>
              <th style={styles.tableCell}>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.color} style={styles.tableRow}>
                <td style={styles.tableCell}>{order.color}</td>
                <td style={styles.tableCell}>{order.parent_width}</td>
                <td style={styles.tableCell}>
                  <ul style={{ listStyleType: 'none', margin: '0', padding: '0' }}>
                    {order.child_rolls.map((roll, index) => (
                      <li key={index}>{`${roll[0]} x ${roll[1]}`}</li>
                    ))}
                  </ul>
                </td>
                <td style={styles.tableCell}>
                  <div>
                  <Link to={`/GraphView/${order.color}`}>
                      <button style={styles.buttonViewGraph}>
                        <BsGraphUp style={styles.icon} /> View Graph
                      </button>
                    </Link>
                  </div>
                  <button style={styles.buttonDelete} onClick={() => handleDeleteOrder(order.color)}>
                    <BsTrash style={styles.icon} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link to="/addorder">
        <button style={styles.buttonAddOrder}>Add Order</button>
      </Link>
      <div style={styles.chartContainer}>
        <canvas id="ordersChart" width="400" height="400"></canvas>
      </div>
    </div>
  );
}

export default GetOrders;

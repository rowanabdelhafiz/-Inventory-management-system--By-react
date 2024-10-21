import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../Navbar/navbar.jsx';

function Customers() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:4000/orders')
      .then(response => {
        console.log('Fetched orders:', response.data);
        setOrders(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
        setLoading(false);
      });
  }, []);

  const styles = {
    container: {
      marginLeft: '250px',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    },
    heading: {
      textAlign: 'center',
      marginBottom: '20px'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: '20px'
    },
    th: {
      backgroundColor: 'hsl(248, 86%, 15%)',
      color: '#ffffff',
      padding: '10px',
      textAlign: 'left',
      borderBottom: '2px solid #ddd'
    },
    td: {
      padding: '10px',
      borderBottom: '1px solid #ddd'
    },
    noOrders: {
      textAlign: 'center',
      fontStyle: 'italic'
    },
    loading: {
      textAlign: 'center'
    },
    button: {
      padding: '8px 16px',
      fontSize: '14px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      marginRight: '10px', // Add margin to separate buttons
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    acceptButton: {
      padding: '8px 16px',
      fontSize: '14px',
      backgroundColor: '#28a745',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    acceptButtonHover: {
      backgroundColor: '#218838',
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      const response = await axios.delete(`http://localhost:4000/orders/${orderId}`);

      if (response.status === 204 || response.status === 200) {
        // Order successfully deleted from the backend
        setOrders(orders.filter(order => order._id !== orderId));
        toast.success('Order deleted successfully!'); // Use toast here
      } else {
        throw new Error(`Failed to delete order with status ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error('Failed to delete order. Please try again.'); // Use toast here
    }
  };

  const handleAcceptOrder = async (orderId) => {
    try {
      const response = await axios.patch(`http://localhost:4000/orders/${orderId}/accept`, {
        status: 'accepted',
        message: 'Your order is accepted. You will receive the quotation soon. The order will arrive in 2 days.'
      });

      if (response.status === 200) {
        setOrders(orders.map(order => order._id === orderId ? { ...order, status: 'accepted' } : order));
        toast.success('Order accepted successfully!');
      } else {
        throw new Error(`Failed to accept order with status ${response.status}`);
      }
    } catch (error) {
      console.error('Error accepting order:', error);
      toast.error('Failed to accept order. Please try again.');
    }
  };

  if (loading) {
    return <p style={styles.loading}>Loading...</p>;
  }

  return (
    <div style={styles.container}>
      <Navbar />
      <h2 style={styles.heading}>All Orders from Customers</h2>
      {orders.length === 0 ? (
        <p style={styles.noOrders}>No orders found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Design Name</th>
              <th style={styles.th}>Style Number</th>
              <th style={styles.th}>Color</th>
              <th style={styles.th}>Height</th>
              <th style={styles.th}>Width</th>
              <th style={styles.th}>Customer Name</th>
              <th style={styles.th}>Phone Number</th>
              <th style={styles.th}>Address</th>
              <th style={styles.th}>Actions</th> {/* Added Actions column */}
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td style={styles.td}>{order.designName || 'Casement-window'}</td>
                <td style={styles.td}>{order.styleNumber || '1'}</td>
                <td style={styles.td}>{order.Color || 'N/A'}</td>
                <td style={styles.td}>{order.Height || 'N/A'}</td>
                <td style={styles.td}>{order.Width || 'N/A'}</td>
                <td style={styles.td}>{order.user_name || 'N/A'}</td>
                <td style={styles.td}>{order.Phone_Number || 'N/A'}</td>
                <td style={styles.td}>{order.Address || 'N/A'}</td>
                <td style={styles.td}>
                  <button
                    style={styles.acceptButton}
                    onClick={() => handleAcceptOrder(order._id)}
                  >
                    Accept
                  </button>
                  <button
                    style={styles.button}
                    onClick={() => handleDeleteOrder(order._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Customers;

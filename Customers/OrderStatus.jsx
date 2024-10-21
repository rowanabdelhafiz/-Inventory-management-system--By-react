import React from 'react';
import Navbar from '../Home2/Navbar2/Navbar2.jsx';
import Footer from '../Home2/Footer.js';
import windowImage from '../Assest/c5.jpg'; // Adjust the path as needed

const OrderStatus = () => {
  const styles = {
    pageContainer: {
      width: '100%',
    },
    navbar: {
      width: '100%',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    footer: {
      width: '100%',
      backgroundColor: '#fff',
      boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)',
    },
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 'calc(100vh - 160px)', // Adjusted to exclude height of navbar and footer
      backgroundColor: '#f4f4f4',
      fontFamily: "'Poppins', sans-serif",
      textAlign: 'center',
      padding: '20px',
    },
    textContainer: {
      flex: 1,
    },
    heading: {
      fontSize: '2em',
      color: '#333',
      marginBottom: '20px',
    },
    subheading: {
      fontSize: '1.5em',
      color: '#555',
      marginBottom: '10px',
    },
    message: {
      fontSize: '1.2em',
      color: '#777',
    },
    imageContainer: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
    },
    image: {
      width: '80%',
      height: 'auto',
    },
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.navbar}>
        <Navbar />
      </div>
      <div style={styles.container}>
        <div style={styles.textContainer}>
          <h1 style={styles.heading}>Congratulations! Your order is accepted!</h1>
          <p style={styles.subheading}>We can't wait to be a part of your future.</p>
          <p style={styles.message}>The quotation will be sent within 2 days, and your order will take 1 week to arrive.</p>
        </div>
        <div style={styles.imageContainer}>
          <img src={windowImage} alt="Window" style={styles.image} />
        </div>
      </div>
      <div style={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default OrderStatus;

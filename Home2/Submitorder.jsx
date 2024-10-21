import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar2 from '../Home2/Navbar2/Navbar2';
import { server } from '../server';

const styles = {
  formContainer: {
    maxWidth: '300px',
    margin: 'auto',
    padding: '30px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  formTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  },
  label: {
    display: 'block',
    textAlign: 'left',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginBottom: '16px',
  },
  select: {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginBottom: '16px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#28a745',
  },
};

function Submitorder() {
  const location = useLocation();
  const navigate = useNavigate();

  const [windowDetails, setWindowDetails] = useState(null);
  const [designName, setDesignName] = useState(''); // Updated state for designName
  const [styleNumber, setStyleNumber] = useState(''); // Updated state for styleNumber
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (location.state && location.state.windowDetails) {
      setWindowDetails(location.state.windowDetails);
    } else {
      // Redirect to the previous step if windowDetails is not available
      navigate('/window-details');
    }
  }, [location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          designName: designName,
          styleNumber: styleNumber,
          ...windowDetails,
          user_name: userName,
          Phone_Number: phoneNumber,
          Address: address,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Order submitted successfully:', data);
      toast.success('Order submitted successfully!');
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      toast.error('Failed to submit the order. Please try again.');
    }
  };
  
  if (!windowDetails) {
    return null; // Optionally, render a loading indicator or a redirect message
  }

  return (
    <div>
      <Navbar2 />
      <div style={styles.formContainer}>
        <h2 style={styles.formTitle}>Enter Your Details</h2>
        <form onSubmit={handleSubmit}>
          <div>
          <div>
            <label htmlFor="designName" style={styles.label}>Design Name:</label>
            <select
              id="designName"
              name="designName"
              style={styles.select}
              value={designName}
              onChange={(e) => setDesignName(e.target.value)}
            >
              <option value="">Select a design</option>
              <option value="Casement Window">Casement Window</option>
              <option value="Fresh Casement Window">Fresh Casement Window</option>
              <option value="Flush Sash Window">Flush Sash Window</option>
              <option value="Sliding Sash Window">Sliding Sash Window</option>
              <option value="Tilt & Turn Window">Tilt & Turn Window</option>
            </select>
          </div>
          <div>
            <label htmlFor="styleNumber" style={styles.label}>Style Number:</label>
            <input
              type="number"
              id="styleNumber"
              name="styleNumber"
              style={styles.input}
              value={styleNumber}
              onChange={(e) => setStyleNumber(e.target.value)}
              placeholder="Enter style number (1 to 12)"
            />
          </div>
            <label htmlFor="userName" style={styles.label}>Name:</label>
            <input
              type="text"
              id="userName"
              name="userName"
              style={styles.input}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" style={styles.label}>Phone Number:</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              style={styles.input}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label htmlFor="address" style={styles.label}>Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              style={styles.input}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
            />
          </div>
         
          <div style={styles.buttonContainer}>
            <button
              type="submit"
              style={{ ...styles.button, ...(isHovered && styles.buttonHover) }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Submitorder;

import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import Navbar from '../Navbar/navbar';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import backgroundImage from 'C:/Users/user/Desktop/Grad/Grad project/Client/front-end/src/components/Assest/form.jpg'; // Adjust the path as per your project structure

const BackgroundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 80vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
`;

function AddOrder() {
  const [color, setColor] = useState('');
  const [parentWidth, setParentWidth] = useState('');
  const [childRolls, setChildRolls] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        orders: {
          [color]: [parseInt(parentWidth), childRolls.map(([quantity, width]) => [parseInt(quantity), parseInt(width)])]
        }
      };
      const response = await axios.post('http://127.0.0.1:5000/process_orders', data);
      console.log('Response:', response.data);
      // Show toast on success
      toast.success('Order inserted correctly');
      // Handle success response
    } catch (error) {
      console.error('Error adding order:', error);
      // Handle error response
    }
  };

  const addChildRoll = () => {
    setChildRolls([...childRolls, ['', '']]);
  };

  const formStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background for form
    padding: '20px',
    borderRadius: '10px', // Rounded corners for the form
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
  };

  return (
    <BackgroundContainer>
      <div style={{ maxWidth: '600px', width: '100%', padding: '20px' }}>
        <Navbar />
        <div style={formStyle}>
          <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Add Order</h1>
          <form style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>
              Color:
              <select value={color} onChange={(e) => setColor(e.target.value)} style={{ marginLeft: '65px', width: "50%", padding: '5px'}}>
                <option value="">Select Color</option>
                <option value="white">White</option>
                <option value="gray">Gray</option>
                <option value="beige">Beige</option>
              </select>
            </label>
            <label style={labelStyle}>
              Parent Width:
              <input
                type="number"
                value={parentWidth}
                onChange={(e) => setParentWidth(e.target.value)}
                style={{ marginLeft: '10px',width: "50%",padding: '5px' }}
              />
            </label>
            <div style={{ marginBottom: '20px', color: 'black' }}>
              <h3>Child Rolls</h3>
              {childRolls.map((roll, index) => (
                <div key={index} style={{ marginBottom: '10px' ,padding: '5px'}}>
                  <label>
                    Quantity:
                    <input
                      type="number"
                      value={roll[0]}
                      onChange={(e) => {
                        const updatedRolls = [...childRolls];
                        updatedRolls[index][0] = e.target.value;
                        setChildRolls(updatedRolls);
                      }}
                      style={{ marginLeft: '10px' ,padding: '5px'}}
                    />
                  </label>
                  <label>
                    Width:
                    <input
                      type="number"
                      value={roll[1]}
                      onChange={(e) => {
                        const updatedRolls = [...childRolls];
                        updatedRolls[index][1] = e.target.value;
                        setChildRolls(updatedRolls);
                      }}
                      style={{ marginLeft: '10px' ,padding: '5px'}}
                    />
                  </label>
                </div>
              ))}
              <button
                style={{
                  padding: '10px 20px',
                  backgroundColor: 'black', // Changed to black background color
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginBottom: '10px',
                }}
                onClick={addChildRoll}
                type="button" // Add type="button" to prevent form submission
              >
                Add Child Roll
              </button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                onClick={handleSubmit} // Move handleSubmit to onClick of submit button
                style={{
                  padding: '10px 20px',
                  backgroundColor: 'black', // Changed to black background color
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginRight: '10px',
                }}
                type="submit"
              >
                Submit
              </button>
              <Link to="/GetOrders" style={{ textDecoration: 'none' }}>
                <button
                  style={{
                    padding: '10px 20px',
                    backgroundColor: 'black', // Changed to black background color
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginLeft: '10px',
                  }}
                >
                  All Orders
                </button>
              </Link>
            </div>
          </form>
        </div>
        <ToastContainer /> {/* Render ToastContainer */}
      </div>
    </BackgroundContainer>
  );
}

export default AddOrder;

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Image1 from "../Assest/c2.jpg";
import Navbar2 from "../Home2/Navbar2/Navbar2";
import { server } from '../server';

const styles = {
  windowDetailsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: '80px',
    width: "100%",
  },
  imageColumn: {
    flex: '0 0 50%',
    padding: '0px',
    height: '90%',
    maxWidth: '800px',
  },
  formColumn: {
    flex: '0 0 50%',
    padding: '20px',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    height: '10%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  formContainer: {
    maxWidth: '300px',
    margin: 'auto',
    padding: '30px',
    height: '30%',
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

function WindowDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [color, setColor] = useState('');
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate color selection
    if (!['beige', 'white', 'gray'].includes(color)) {
      alert('Please select a valid color (beige, white, gray)');
      return;
    }

    // Prepare window details object
    const windowDetails = { Color: color, Height: height, Width: width };

    // Navigate to Submitorder page with window details in state
    navigate('/Submitorder', { state: { windowDetails } });
  };

  const imageUrl = Image1; // Replace with actual image URL

  return (
    <div>
      <Navbar2 />
      <div style={styles.windowDetailsContainer}>
        <div style={styles.imageColumn}>
          <img src={imageUrl} alt={`Window ${id}`} style={{ width: '100%', height: 'auto' }} />
        </div>
        <div style={styles.formColumn}>
          <div style={styles.formContainer}>
            <h2 style={styles.formTitle}>Window Details</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="color" style={styles.label}>Color:</label>
                <select
                  id="color"
                  name="color"
                  style={styles.select}
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                >
                  <option value="">Select a color</option>
                  <option value="beige">Beige</option>
                  <option value="white">White</option>
                  <option value="gray">Gray</option>
                </select>
              </div>
              <div>
                <label htmlFor="height" style={styles.label}>Height:</label>
                <input
                  type="text"
                  id="height"
                  name="height"
                  style={styles.input}
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="Enter the height"
                />
              </div>
              <div>
                <label htmlFor="width" style={styles.label}>Width:</label>
                <input
                  type="text"
                  id="width"
                  name="width"
                  style={styles.input}
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  placeholder="Enter the width"
                />
              </div>
              <div style={styles.buttonContainer}>
                <button
                  type="submit"
                  style={{ ...styles.button, ...(isHovered && styles.buttonHover) }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WindowDetails;

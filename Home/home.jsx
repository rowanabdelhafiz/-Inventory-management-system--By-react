import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/navbar';
import imageSrc from '../Assest/Home.jpg'; // Import your image

const Home = () => {
  return (
    <>
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        a {
          text-decoration: none;
        }

        .header {
          width: 100vw;
          height: 100vh;
          background-image: url(${imageSrc});
          background-position: bottom;
          background-size: cover;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          overflow-y: auto; 
        }

        .header-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 15px;
          text-align: center;
          height: 60%;
        }

        .header-content h2 {
          font-size: 4vmin;
          color: rgb(247, 249, 247);
        }

        .line {
          width: 250px;
          height: 4px;
          background: rgb(251, 247, 247);
          margin: 10px auto;
          border-radius: 5px;
        }

        .header-content h1 {
          font-size: 8vmin;
          margin-top: 50px;
          margin-bottom: 30px;
          color: rgb(234, 236, 233);
        }

        .home-container {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-around;
          flex-wrap: wrap; /* Allows items to wrap onto multiple lines */
        }

        .card {
          width: 300px;
          padding: 10px;
          border: 1px solid #000080;
          border-radius: 10px;
          text-align: center;
          cursor: pointer;
          background-color: #0A1F48;
          color: #fff;
          margin-bottom: 50px;
          margin-right: 20px; /* Add margin-right for space between cards */
        }

        .card:hover {
          background-color: #000080;
        }

        .card.stock-management {
          order: 2; 
        }

        .card.supplier-management {
          order: 1; 
        }

        /* Responsive styles */
        @media (max-width: 768px) {
          .header {
            height: auto; /* Adjust header height for smaller screens */
            padding: 20px;
            background-position: center; /* Center the background image */
          }

          .header-content {
            margin-bottom: 100px;
          }

          .header-content h2 {
            font-size: 6vmin; /* Increase font size for smaller screens */
          }

          .header-content h1 {
            font-size: 12vmin; /* Increase font size for smaller screens */
          }

          .home-container {
            flex-direction: column; /* Stack cards vertically on smaller screens */
            align-items: center; /* Center the cards */
          }

          .card {
            width: 80%; /* Make cards take up more space on smaller screens */
            margin-right: 0; /* Remove right margin */
          }
        }

        @media (max-width: 480px) {
         .header {
            height: auto; /* Adjust header height for smaller screens */
            padding: 20px;
            background-position: center; /* Center the background image */
            align-items: flex-start; /* Align items at the top */
          }

          .header-content {
            margin-bottom: 100px;
            margin-top: 20px; /* Add top margin */
          }

          .header-content h2 {
            font-size: 6vmin; /* Increase font size for smaller screens */
          }

          .header-content h1 {
            font-size: 12vmin; /* Increase font size for smaller screens */
          }

          .home-container {
            flex-direction: column; /* Stack cards vertically on smaller screens */
            align-items: center; /* Center the cards */
          }

          .card {
            width: 80%; /* Make cards take up more space on smaller screens */
            margin-right: 0; /* Remove right margin */
          }
        }
          @media (max-width: 480px) {
          .header-content {
            margin-bottom: 50px;
            margin-top: 20px; /* Add top margin */
          }

          .header-content h2 {
            font-size: 8vmin; /* Increase font size for smaller screens */
          }

          .header-content h1 {
            font-size: 14vmin; /* Increase font size for smaller screens */
          }

          .card {
            width: 100%; /* Make cards full width on very small screens */
            margin-bottom: 20px;
          }
        }
      `}</style>
      
      <div className="header">
        <div className='header-content'>
          <h2>Welcome To our Company</h2>
          <div className='line'></div>
          <h1>Helping You To Build Your Future</h1>
          <div className="home-container">
            <Link to="/view-product" className="card stock-management">
              <h2>Stock Management</h2>
            </Link>
            <Link to="/view-suppliers" className="card supplier-management">
              <h2>Supplier Management</h2>
            </Link>
          </div>
          <Navbar />
        </div>
      </div>
    </>
  );
};

export default Home;

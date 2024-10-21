import React from "react";
import { Link } from "react-router-dom";
import Navbar2 from "../Home2/Navbar2/Navbar2";
import Image1 from "../Assest/Casement Window.jpg";
import Image2 from "../Assest/french Casement .jpg";
import Image3 from "../Assest/Flush Sash Window.jpg";
import Image4 from "../Assest/sliding sash.jpg";
import Image5 from "../Assest/tilt&turn.jpg";

function WindowDesignPage() {
  const cards = [
    { image: Image1, text: "Casement Window", link: "/Casement-Window-styles" },
    { image: Image2, text: "Fresh Casement Window", link: "/Casement-Window-styles" },
    { image: Image3, text: "Flush Sash Window", link: "/Casement-Window-styles" },
    { image: Image4, text: "Sliding Sash Window", link: "/Casement-Window-styles" },
    { image: Image5, text: "Tilt & Turn Window", link: "/Casement-Window-styles" }
  ];

  const styles = {
    cardsContainer: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "20px",
    },
    cardsTitle: {
      textAlign: "center",
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "24px",
      marginTop: "24px",
      fontFamily: "Arial, sans-serif",
      color: "#333",
    },
    card: {
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
      flex: "0 0 calc((100% / 3) - 32px)",
      marginBottom: "16px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      transition: "box-shadow 0.3s ease",
      textDecoration: "none",
      color: "inherit",
    },
    cardHover: {
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    },
    cardImage: {
      width: "100%",
      height: "200px",
      objectFit: "contain",
    },
    cardText: {
      padding: "26px",
      textAlign: "center",
      fontSize: "20px",
      fontWeight: "bold",
      color: "#0b0b0b",
    },
  };

  return (
    <div>
      <Navbar2 />
      <h2 style={styles.cardsTitle}>Customize Your Window Design Now</h2>
      <div style={styles.cardsContainer}>
        {cards.map((card, index) => (
          <Link key={index} to={card.link} style={{ ...styles.card, ...(index === 0 && styles.cardHover) }}>
            <div className="card">
              <img src={card.image} alt={`Card ${index + 1}`} style={styles.cardImage} />
              <div style={styles.cardText}>{card.text}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default WindowDesignPage;

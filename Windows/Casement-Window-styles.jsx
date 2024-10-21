import React from "react";
import { Link } from "react-router-dom";
import Image1 from "../Assest/c2.jpg";
import Image2 from "../Assest/c3.jpg";
import Image3 from "../Assest/c4.jpg";
import Image4 from "../Assest/c5.jpg";
import Image5 from "../Assest/c6.jpg";
import Image6 from "../Assest/c7.jpg";
import Image7 from "../Assest/c8.jpg";
import Image8 from "../Assest/c9.jpg";
import Image9 from "../Assest/c9 - Copy.jpg";
import Image10 from "../Assest/c10.jpg";
import Image11 from "../Assest/c11.jpg";
import Image12 from "../Assest/c12.jpg";
import Navbar2 from "../Home2/Navbar2/Navbar2.jsx";

const styles = {
  casementWindowStyles: {
    textAlign: "center",
    padding: "20px",
  },
  sectionTitle: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "24px",
    fontFamily: "Arial, sans-serif",
    color: "#333",
    textAlign: "center",
  },
  cardsContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
  },
  card: {
    width: "calc((100% / 4) - 20px)",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform 0.3s ease",
    textDecoration: "none",
    color: "inherit",
    display: "block",
  },
  cardImage: {
    width: "100%",
    height: "auto",
    display: "block",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
  },
  cardText: {
    padding: "12px",
    textAlign: "center",
    fontSize: "16px",
    color: "#0b0b0b",
  },
};

function CasementWindowStyles() {
  const images = [
    { id: 1, image: Image1, text: "Style 1" },
    { id: 2, image: Image2, text: "Style 2" },
    { id: 3, image: Image3, text: "Style 3" },
    { id: 4, image: Image4, text: "Style 4" },
    { id: 5, image: Image5, text: "Style 5" },
    { id: 6, image: Image6, text: "Style 6" },
    { id: 7, image: Image7, text: "Style 7" },
    { id: 8, image: Image8, text: "Style 8" },
    { id: 9, image: Image9, text: "Style 9" },
    { id: 10, image: Image10, text: "Style 10" },
    { id: 11, image: Image11, text: "Style 11" },
    { id: 12, image: Image12, text: "Style 12" },
  ];

  return (
    <div style={styles.casementWindowStyles}>
      <Navbar2 />
      <h2 style={styles.sectionTitle}>Casement Window Styles</h2>
      <div style={styles.cardsContainer}>
        {images.map((image) => (
          <Link
            key={image.id}
            to={`/window-details`} // Dynamic path based on style ID
            style={styles.card}
          >
            <img
              src={image.image}
              alt={`Casement Window ${image.id}`}
              style={styles.cardImage}
            />
            <div style={styles.cardText}>{image.text}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CasementWindowStyles;

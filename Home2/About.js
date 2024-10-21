import React, { useState, useEffect } from "react";
import Doctor from "C:/Users/user/Desktop/Grad/Grad project/Client/front-end/src/components/Assest/UPVC-windows.jpg";
import SolutionStep from "../Home2/SolutionStep.js";
import "../Styles/About.css";

function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById("about");
      if (!aboutSection) return;

      const sectionTop = aboutSection.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight * 0.75) {
        setIsVisible(true);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="about-section" id="about">
      <div className={`about-image-content ${isVisible ? "show" : ""}`}>
        <img src={Doctor} alt="Doctor Group" className="about-image1" />
      </div>

      <div className="about-text-content">
        <h3 className="about-title">
          <span>About Us</span>
        </h3>
        <p className="about-description">
          Welcome to Future Company, your premier destination for reliable,
          practical, and affordable uPVC windows throughout Egypt. With a
          dedicated team of experienced installation experts and state-of-the-art
          fabrication machinery, we ensure superior quality and precision in every
          product we offer. Discover how our commitment to excellence can enhance
          your living or working space today.
        </p>

        <SolutionStep
          title="Wide Range of Product"
          description="Providing reliable, practical, and affordable uPVC windows across Egypt."
        />

        <SolutionStep
          title="Expert Installation Team:"
          description="Employing a highly trained installation staff for expert fittings."
        />

        <SolutionStep
          title="Advanced Fabrication Technology"
          description="Utilize our state-of-the-art machinery and equipment for unmatched precision and quality."
        />
      </div>
    </div>
  );
}

export default About;

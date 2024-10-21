import React, { useState, useEffect } from "react";
import DoctorCard from "C:/Users/user/Desktop/Grad/Grad project/Client/front-end/src/components/Home2/DoctorCard.js";
import profile1 from "C:/Users/user/Desktop/Grad/Grad project/Client/front-end/src/components/Assest/project1.jpg";
import profile2 from "C:/Users/user/Desktop/Grad/Grad project/Client/front-end/src/components/Assest/project2.jpg";
import profile3 from "C:/Users/user/Desktop/Grad/Grad project/Client/front-end/src/components/Assest/project3.jpg";
import profile4 from "C:/Users/user/Desktop/Grad/Grad project/Client/front-end/src/components/Assest/project4 .jpg";
import profile5 from "C:/Users/user/Desktop/Grad/Grad project/Client/front-end/src/components/Assest/image1 .jpeg";
import profile6 from "C:/Users/user/Desktop/Grad/Grad project/Client/front-end/src/components/Assest/project5 .jpg";
import profile7 from "C:/Users/user/Desktop/Grad/Grad project/Client/front-end/src/components/Assest/project6 .jpg";
import profile8 from "C:/Users/user/Desktop/Grad/Grad project/Client/front-end/src/components/Assest/project7 .jpg";
import profile9 from "C:/Users/user/Desktop/Grad/Grad project/Client/front-end/src/components/Assest/project8 .jpg";
import profile10 from "C:/Users/user/Desktop/Grad/Grad project/Client/front-end/src/components/Assest/project9.jpg";

import "../Styles/Doctors.css";

function Doctors() {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const profiles = [
    profile1,
    profile2,
    profile3,
    profile4,
    profile5,
    profile6,
    profile7,
    profile8,
    profile9,
    profile10,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProfileIndex((prevIndex) =>
        prevIndex === profiles.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds (adjust as needed)

    return () => clearInterval(interval);
  }, [profiles]);

  function plusSlides(n) {
    const newIndex = currentProfileIndex + n;
    if (newIndex < 0) {
      setCurrentProfileIndex(profiles.length - 1);
    } else if (newIndex >= profiles.length) {
      setCurrentProfileIndex(0);
    } else {
      setCurrentProfileIndex(newIndex);
    }
  }

  return (
    <div className="doctor-section" id="doctors">
      <div className="dt-title-content">
        <h3 className="dt-title">Our Latest Projects</h3>
      </div>
      <div className="slideshow-container">
        <a className="prev" onClick={() => plusSlides(-1)}>
          &#10094;
        </a>
        <DoctorCard img={profiles[currentProfileIndex]} />
        <a className="next" onClick={() => plusSlides(1)}>
          &#10095;
        </a>
      </div>
    </div>
  );
}

export default Doctors;

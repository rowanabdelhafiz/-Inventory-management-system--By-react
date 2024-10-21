import React, { useState, useEffect } from 'react';
import Image1 from "C:/Users/user/Desktop/Grad/Grad project/Client/front-end/src/components/Assest/project5 .jpg";
import Image2 from "C:/Users/user/Desktop/Grad/Grad project/Client/front-end/src/components/Assest/image1 .jpeg";

const Hero = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
      setShowText(false);
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const slides = [
    { src: Image1, title: 'WELCOME TO OUR COMPANY', caption: 'UPVC WINDOWS AND DOORS', additionalText: 'Now in Egypt' },
    { src: Image2, title: 'Let\'s build your future together', caption: 'Your Satisfaction, Our Priority!' },
  ];

  useEffect(() => {
    const showTextTimeout = setTimeout(() => {
      setShowText(true);
    }, 50); 

    return () => {
      clearTimeout(showTextTimeout);
    };
  }, [slideIndex]);

  return (
    <div style={{ 
      position: 'relative',
      width: '100vw', /* Full width */
      height: '60vh', /* Set height to 60vh */
      margin: 'auto', /* Center the container horizontally */
      overflow: 'hidden', /* Hide overflow content (e.g., when images are larger) */
    }}>
      {slides.map((slide, index) => (
        <div
          key={index}
          style={{ 
            position: 'absolute', /* Ensure relative positioning for absolute children */
            width: '100%',
            height: '100%',
            display: index === slideIndex ? 'block' : 'none',
            animationName: 'fade',
            animationDuration: '1.5s',
          }}
        >
          <div style={{ 
            color: '#f2f2f2',
            fontSize: '12px',
            padding: '8px 12px',
            position: 'absolute',
            top: 0,
          }}>{`${index + 1} / ${slides.length}`}</div>
          <div style={{ 
            position: 'relative',
            width: '100%', /* Ensure container takes full width */
            height: '100%', /* Ensure container takes full height */
            overflow: 'hidden', /* Hide overflowing image */
          }}>
            <img src={slide.src} alt={`Slide ${index + 1}`} style={{ 
              width: '100%', /* Ensure image fills the entire width of its container */
              height: '100%', /* Ensure image fills the entire height of its container */
              objectFit: 'cover', /* Ensure the image covers the container */
              objectPosition: 'center', /* Center the image */
              filter: 'blur(1px)', /* Apply a blur filter to the image */
            }} />
            <div style={{ 
              color: '#fff',
              textAlign: 'center',
              position: 'absolute',
              bottom: showText && index === slideIndex ? '20%' : '-100%', /* Initially hidden below the image */
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '50px',
              borderRadius: '5px',
              width: '80%', /* Adjust width as needed */
              maxWidth: '500px', /* Limit width if necessary */
              zIndex: 1, /* Ensure text is above the image */
              transition: 'bottom 0.5s ease-in-out', /* Smooth transition for showing/hiding */
            }}>
              <h2 style={{ 
                fontSize: '40px', /* Title font size */
                marginBottom: '50px', /* Bottom margin for spacing */
              }}>{slide.title}</h2>
              <p style={{ 
                fontSize: '24px', /* Caption font size */
                lineHeight: '1.6', /* Line height for readability */
              }}>{slide.caption}</p>
              {index === 0 && <p style={{ fontSize: '16px', color: '#fff' }}>{slide.additionalText}</p>}
            </div>
          </div>
        </div>
      ))}

      <a style={{ 
        cursor: 'pointer',
        position: 'absolute',
        top: '50%',
        width: 'auto',
        padding: '16px',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '18px',
        transition: '0.6s ease',
        borderRadius: '50%',
        backgroundColor: 'rgba(0,0,0,0.4)',
        zIndex: 1, 
        left: '10px', 
      }} onClick={() => setSlideIndex((slideIndex - 1 + slides.length) % slides.length)}>&#10094;</a>
      <a style={{ 
        cursor: 'pointer',
        position: 'absolute',
        top: '50%',
        width: 'auto',
        padding: '16px',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '18px',
        transition: '0.6s ease',
        borderRadius: '50%',
        backgroundColor: 'rgba(0,0,0,0.4)',
        zIndex: 1, 
        right: '10px', 
      }} onClick={() => setSlideIndex((slideIndex + 1) % slides.length)}>&#10095;</a>

      <div style={{ textAlign: 'center' }}>
        {slides.map((_, index) => (
          <span key={index} className={`dot ${index === slideIndex ? 'active' : ''}`} style={{ 
            cursor: 'pointer',
            height: '15px',
            width: '15px',
            margin: '0 2px',
            backgroundColor: '#bbb',
            borderRadius: '50%',
            display: 'inline-block',
            transition: 'background-color 0.6s ease',
          }} />
        ))}
      </div>
    </div>
  );
};

export default Hero;

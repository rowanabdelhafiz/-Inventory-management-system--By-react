import React from "react";
import Navbar2 from "../Home2/Navbar2/Navbar2";
import Hero from "C:/Users/user/Desktop/Grad/Grad project/Client/front-end/src/components/Home2/Hero.js";
import Info from "C:/Users/user/Desktop/Grad/Grad project/Client/front-end/src/components/Home2/Info.js";
import About from "C:/Users/user/Desktop/Grad/Grad project/Client/front-end/src/components/Home2/About.js";
// import BookAppointment from "../Components/BookAppointment";
// import Reviews from "../Components/Reviews";
import Doctors from "C:/Users/user/Desktop/Grad/Grad project/Client/front-end/src/components/Home2/Doctors.js";
// import Footer from "../Components/Footer";

function Home() {
  return (
    <div className="home-section">
      <Navbar2 />
      <Hero />
      <Info />
      <About />
      {/* <BookAppointment /> */}
      {/* <Reviews /> */}
      <Doctors />
      {/* <Footer /> */}
    </div>
  );
}

export default Home;

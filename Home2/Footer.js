import React from "react";
import "../Styles/Footer.css";
import SubscribeNewsletter from "./SubscribeNewsletter";
import { faPhone, faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebook} from "@fortawesome/free-brands-svg-icons"; // Import FontAwesome brands icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer() {
  return (
    <div className="footer-section">
      <div className="footer-container">
        <div className="ft-info">
          <div className="ft-info-p1">
            <p className="ft-title">Future Window Company</p>
            <p className="ft-description">
              Future Window U-PVC Window & Door, pride ourselves on our quality products and are dedicated to bringing satisfaction to all of our clients.
              Through our ability to produce the perfect finish that you expect from the best professional U-PVC windows & doors fabricator.
            </p>
          </div>
          <SubscribeNewsletter />
        </div>

        <div className="ft-list" id="contact">
          <p className="ft-list-title">Contact</p>
          <ul className="ft-list-items">
            <li>
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
              <a href="mailto:info@futurepvcwindows.com">info@futurepvcwindows.com</a>
            </li>
            <li>
              <FontAwesomeIcon icon={faPhone} className="icon" />
              <a href="tel:+21000913076">+2 1000913076</a>
            </li>
            <li>
              <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
              Building 192, 6th Touristic Zone, 6th of October City, Giza
            </li>
            <li>
              <FontAwesomeIcon icon={faFacebook} className="icon" />
              <a href="https://www.facebook.com/FutureWindowsUPVC" target="_blank" rel="noopener noreferrer">Facebook</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;

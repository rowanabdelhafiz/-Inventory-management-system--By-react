import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faBars, faXmark, faSignInAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from 'C:/Users/user/Desktop/Grad/Grad project/Client/front-end/src/components/Assest/logo.jpg';
import { UserContext } from "C:/Users/user/Desktop/Grad/Grad project/Client/front-end/src/components/UserContext.js";

function Navbar() {
  const [nav, setNav] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const openNav = () => {
    setNav(!nav);
  };

  const handleChatBtnClick = () => {
    if (!isButtonDisabled) {
      toast.info('Experiencing high traffic, Please wait a moment.', {
        position: toast.POSITION.TOP_CENTER,
        onOpen: () => setIsButtonDisabled(true),
        onClose: () => setIsButtonDisabled(false),
      });
    }
  };

  const handleLogout = () => {
    // Perform logout logic, such as clearing user data
    setUser(null); // Assuming setUser is provided by UserContext to update user state
  };

  return (
    <div style={styles.navbarSection}>
      <h1 style={styles.navbarTitle}>
        <Link to="/">
          <img src={Logo} alt="Logo" style={styles.logoImage} />
          <span style={styles.navbarSign}></span>
        </Link>
      </h1>

      {/* Desktop */}
      <ul style={styles.navbarItems}>
        <li>
          <Link to="/" style={styles.navbarLinks}>
            Home
          </Link>
        </li>
        <li>
          <a href="#services" style={styles.navbarLinks}>
            Services
          </a>
        </li>
        <li>
          <a href="#about" style={styles.navbarLinks}>
            About
          </a>
        </li>
        <li>
          <a href="#doctors" style={styles.navbarLinks}>
            Projects
          </a>
        </li>
        <li>
          <Link to="/AppointmentForm" style={styles.navbarLinks}>
            Designs
          </Link>
        </li>
        {user && (
          <li>
            <Link to={`/OrderStatus`} style={styles.navbarLinks}>
              Orders
            </Link>
          </li>
        )}
      </ul>

      {user ? (
        <div style={styles.loggedInContainer} onClick={handleLogout}>
          <FontAwesomeIcon icon={faUserCircle} style={styles.userIcon} />
          <span style={styles.username}>{user.username}</span>
        </div>
      ) : (
        <Link to="/login" style={styles.navbarBtnLink}>
          <button
            style={styles.navbarBtn}
            type="button"
            disabled={isButtonDisabled}
            onClick={handleChatBtnClick}
          >
            <FontAwesomeIcon icon={faSignInAlt} style={styles.hambIcon} />
            Login
          </button>
        </Link>
      )}

      <div style={{ ...styles.mobileNavbar, ...(nav ? styles.openNav : {}) }}>
        <div onClick={openNav} style={styles.mobileNavbarClose}>
          <FontAwesomeIcon icon={faXmark} style={styles.hambIcon} />
        </div>

        <ul style={styles.mobileNavbarLinks}>
          <li>
            <Link onClick={openNav} to="/" style={styles.mobileNavbarLink}>
              Home
            </Link>
          </li>
          <li>
            <a onClick={openNav} href="#services" style={styles.mobileNavbarLink}>
              Services
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#about" style={styles.mobileNavbarLink}>
              About
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#contact" style={styles.mobileNavbarLink}>
              Contact
            </a>
          </li>
          {user && (
            <li>
              <Link onClick={openNav} to={`/orders/OrderStatus`} style={styles.mobileNavbarLink}>
                Orders
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* Hamburger Icon */}
      <div style={styles.mobileNav}>
        <FontAwesomeIcon
          icon={faBars}
          onClick={openNav}
          style={styles.hambIcon}
        />
      </div>
    </div>
  );
}

const styles = {
  navbarSection: {
    padding: '0 32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: '80px',
    backgroundColor: 'white',
  },
  navbarTitle: {
    fontFamily: "'Poppins', sans-serif",
    display: 'flex',
    alignItems: 'center',
  },
  logoImage: {
    width: '100px',
    height: 'auto',
    marginRight: '10px',
  },
  navbarSign: {
    color: '#54de54',
    fontFamily: 'Cambria, sans-serif',
    fontSize: '40px',
    fontWeight: 'bold',
  },
  navbarItems: {
    listStyleType: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '32px',
    fontFamily: "'Rubik', sans-serif",
  },
  navbarLinks: {
    textDecoration: 'none',
    color: 'black',
    fontSize: '18px',
    letterSpacing: '.8px',
  },
  navbarLinksHover: {
    color: '#0cc2ea',
  },
  navbarBtn: {
    padding: '14px 20px',
    color: 'white',
    border: '1px solid transparent',
    borderRadius: '28px',
    outline: 'transparent',
    backgroundColor: '#1A8EFD',
    fontSize: '18px',
    fontFamily: "'Rubik', sans-serif",
    letterSpacing: '.8px',
    cursor: 'pointer',
    transition: 'all .4s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  userIcon: {
    fontSize: '24px',
    color: '#1A8EFD',
  },
  loggedInContainer: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  username: {
    fontSize: '18px',
    color: '#1A8EFD',
  },
  navbarBtnHover: {
    color: '#1A8EFD',
    backgroundColor: 'white',
    border: '1px solid #1A8EFD',
  },
  mobileNav: {
    display: 'none',
  },
  hambIcon: {
    width: '26px',
    height: '26px',
    cursor: 'pointer',
  },
  mobileNavbar: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: '-100%',
    backgroundColor: 'white',
    zIndex: 20,
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'left .5s ease-in-out',
  },
  mobileNavbarClose: {
    position: 'absolute',
    top: '28px',
    right: '28px',
  },
  openNav: {
    left: 0,
  },
  mobileNavbarLinks: {
    listStyleType: 'none',
    display: 'flex',
    flexDirection: 'column',
    fontSize: '24px',
    gap: '24px',
    textAlign: 'center',
  },
  mobileNavbarLink: {
    textDecoration: 'none',
    color: 'black',
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 'bold',
    letterSpacing: '.8px',
    transition: 'color .3s ease-in-out',
  },
  mobileNavbarLinkHover: {
    color: '#0cc2ea',
  },
  '@media screen and (maxWidth: 900px)': {
    navbarBtn: {
      display: 'none',
    },
    navbarItems: {
      display: 'none',
    },
    mobileNav: {
      display: 'block',
    },
  },
};

export default Navbar;

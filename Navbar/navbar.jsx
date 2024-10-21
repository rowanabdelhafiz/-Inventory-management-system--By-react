import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import img from 'C:/Users/user/Desktop/Grad/Grad project/Client/front-end/src/components/Assest/logo.jpg';
import { FaUserCircle, FaBox, FaTruck, FaClipboardList, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(""); // State to track active menu item

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuClick = (menuName) => {
    setMenuOpen(false); // Close the sidebar
    setActiveMenu(menuName); // Set active menu item
  };

  return (
    <div className={`sidebar ${menuOpen ? 'open' : ''}`} style={styles.sidebar}>
      <div className="sidebar-header" style={styles.sidebarHeader}>
        <img src={img} alt="Logo" style={styles.logo} />
        <span className="menu-toggle" onClick={toggleMenu} style={styles.menuToggle}>
          <span style={styles.menuSpan}></span>
          <span style={styles.menuSpan}></span>
          <span style={styles.menuSpan}></span>
        </span>
      </div>
      <ul className="sidebar-menu" style={styles.sidebarMenu}>
        <li onClick={() => handleMenuClick("products")} style={styles.sidebarMenuItem(activeMenu === "products")}>
          <FaBox size={20} style={styles.sidebarIcon} />
          <NavLink to="/view-product" style={styles.menuLink}>Products</NavLink>
        </li>
        <li onClick={() => handleMenuClick("suppliers")} style={styles.sidebarMenuItem(activeMenu === "suppliers")}>
          <FaTruck size={20} style={styles.sidebarIcon} />
          <NavLink to="/view-suppliers" style={styles.menuLink}>Suppliers</NavLink>
        </li>
        <li onClick={() => handleMenuClick("orders")} style={styles.sidebarMenuItem(activeMenu === "orders")}>
          <FaClipboardList size={20} style={styles.sidebarIcon} />
          <NavLink to="/GetOrders" style={styles.menuLink}>Orders</NavLink>
        </li>
        <li onClick={() => handleMenuClick("orders")} style={styles.sidebarMenuItem(activeMenu === "orders")}>
          <FaClipboardList size={20} style={styles.sidebarIcon} />
          <NavLink to="/Customers" style={styles.menuLink}>Customer Orders</NavLink>
        </li>
        <li onClick={() => handleMenuClick("logout")} style={styles.sidebarMenuItem(activeMenu === "logout")}>
          <FaSignOutAlt size={20} style={styles.sidebarIcon} />
          <NavLink to="/" style={styles.menuLink}>Logout</NavLink>
        </li>
      </ul>
      <div className="dashboard-panel" style={styles.dashboardPanel}>
        <div className="panel-header" style={styles.panelHeader}>
          <img src={img} alt="Logo" style={styles.panelLogo} />
          <FaUserCircle size={30} style={styles.userIcon} />
          <span style={styles.userName}>username</span>
        </div>
        {/* Render content based on active menu item */}
        {activeMenu === "products" && (
          <div style={styles.dashboardContent}>
            <h2>Products Content</h2>
            {/* Add specific content for Products */}
          </div>
        )}
        {activeMenu === "suppliers" && (
          <div style={styles.dashboardContent}>
            <h2>Suppliers Content</h2>
            {/* Add specific content for Suppliers */}
          </div>
        )}
        {activeMenu === "orders" && (
          <div style={styles.dashboardContent}>
            <h2>Orders Content</h2>
            {/* Add specific content for Orders */}
          </div>
        )}
        {activeMenu === "Customer Orders" && (
          <div style={styles.dashboardContent}>
            <h2>Customer Orders</h2>
            {/* Add specific content for Orders */}
          </div>
        )}
        {activeMenu === "logout" && (
          <div style={styles.dashboardContent}>
            <h2>Logout Content</h2>
            {/* Add logout functionality or confirmation */}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "250px",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "#0f172a",
    color: "white",
    overflowY: "auto",
    transition: "transform 0.3s ease-in-out",
    zIndex: 1000,
  },
  sidebarHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    borderBottom: "1px solid #2c3e50",
  },
  logo: {
    maxWidth: "100px",
  },
  menuToggle: {
    cursor: "pointer",
    padding: "10px",
  },
  menuSpan: {
    display: "block",
    height: "3px",
    width: "25px",
    backgroundColor: "white",
    marginBottom: "5px",
  },
  sidebarMenu: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  sidebarMenuItem: (active) => ({
    cursor: "pointer",
    padding: "15px",
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid #2c3e50",
    transition: "background-color 0.3s ease-in-out",
    backgroundColor: active ? "#1f2937" : "inherit",
  }),
  sidebarIcon: {
    marginRight: "10px",
  },
  menuLink: {
    textDecoration: "none",
    color: "white",
    fontSize: "16px",
    marginLeft: "5px",
  },
  dashboardPanel: {
    position: "absolute",
    top: 0,
    left: "250px",
    width: "calc(100% - 250px)",
    height: "100vh",
    backgroundColor: "#1f2937",
    color: "white",
    zIndex: "999",
    padding: "20px",
    boxShadow: "-2px 0 5px rgba(0,0,0,0.5)",
    overflowY: "auto",
  },
  panelHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  panelLogo: {
    maxWidth: "50px",
    marginRight: "10px",
  },
  userIcon: {
    marginRight: "10px",
  },
  userName: {
    fontSize: "20px",
  },
  dashboardContent: {
    marginTop: "20px",
  },
};

export default Navbar;

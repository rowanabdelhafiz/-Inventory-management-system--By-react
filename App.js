import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Product from './components/products/product'; 
import Home from './components/Home/home';
import Home2 from "./components/Home2/Home2.js";
import Register from './components/Authentication/Register.jsx';
import Footer from  "C:/Users/user/Desktop/Grad/Grad project/Client/front-end/src/components/Home2/Footer.js";
import Login from './components/Authentication/Login';
import ViewProduct from './components/view-product/view-product';
import AddSupplier from './components/add-suppliers/add-supplier';
import WindowDetails from './components/Home2/window-details.jsx';
import ViewSuppliers from './components/view-suppliers/view-supplier';
import GetOrders from './components/Orders/getorders';
import AddOrder from './components/Orders/addorder'; 
import AppointmentForm from './components/Home2/AppointmentForm.jsx';
import { UserProvider } from "./components/UserContext.js";
import Casement_Window_styles from './components/Windows/Casement-Window-styles.jsx'
import GraphView from './components/Orders/GraphView';
import SubmitOrder from './components/Home2/Submitorder.jsx';
import Customers from './components/Customers/Customers.jsx'
import OrderStatus from './components/Customers/OrderStatus.jsx'
import AdminHome from './components/Admin/AdminHome.jsx';
import ManageEmployees from './components/Admin/ManageEmployees.jsx';
const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (index) => {
    setCartItems((prevItems) => [...prevItems, index]);
  };

  return (
    <UserProvider>
    <Router>
      {/* <Navbar/> */}
      <Routes>
        <Route path="/" element={<Home2 />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/window-details" element={<WindowDetails />} />
        <Route path="/orders/customer/:customerId" component={OrderStatus} />
        <Route path="/product" element={<Product />} />
        <Route path='/view-product' element={<ViewProduct />} />
        <Route path="/GraphView/:color" element={<GraphView />}/>
        <Route path="/Home" element={<Home />} />
        <Route path='/Register' element={<Register/>}/>
        <Route path="/view-suppliers" element={<ViewSuppliers />} />
        <Route path='/add-suppliers' element={<AddSupplier />} />
        <Route path='/getorders' element={<GetOrders />} /> 
        <Route path='/addorder' element={<AddOrder />} />
        <Route path="/AppointmentForm" element={<AppointmentForm />} />
        <Route path='/Casement-Window-styles' element={<Casement_Window_styles/>}/>
        <Route path="/Submitorder" element={<SubmitOrder />} />
        <Route path="/Customers" element={<Customers />} />
        <Route path="/OrderStatus" element={<OrderStatus />} />
        <Route path='/adminHome' element={<AdminHome/>}/>
        <Route path="/ManageEmployees" element={<ManageEmployees />} />
        <Route
          path="/"
          element={<Home cartItems={cartItems} handleAddToCart={handleAddToCart} />}
        />
      </Routes>
      <Footer/>
    </Router>
    </UserProvider>
  );
};

export default App;

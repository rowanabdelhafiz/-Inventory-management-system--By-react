// ParentComponent.js

import React, { useState } from 'react';
import Navbar from '../components/Navbar/navbar';
import ViewSuppliers from './ViewSuppliers';

const ParentComponent = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <ViewSuppliers menuOpen={menuOpen} />
    </>
  );
};

export default ParentComponent;

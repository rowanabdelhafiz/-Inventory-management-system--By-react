// ViewSuppliers.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { server } from '../server';
import { Link } from 'react-router-dom';
import { BsPen, BsTrash } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
import img from 'C:/Users/user/Desktop/Grad/Grad project/Client/front-end/src/components/Assest/logo.jpg';
// import './view-supplier.css'
import Navbar from '../Navbar/navbar';
// import 'C:/Users/user/Desktop/Grad/Grad project/Client/front-end/src/Button.css'

const ViewSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [editSupplierValues, setEditSupplierValues] = useState({
    Supplier_name: '',
    Phone_Number: '',
    Supplier_id: '',
    Category: '',
    Email: '',
  });
  const [sidePanelOpen, setSidePanelOpen] = useState(false); // State for side panel
  const [username, setUsername] = useState(''); // State for username

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get(`${server}supplier`);
        setSuppliers(response.data);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };

    fetchSuppliers();

    // Example: Fetch username based on logged-in user
    setUsername('John Doe'); // Replace with actual logic to fetch username
  }, []);

  const handleCheckboxChange = (supplierId) => {
    const isSelected = selectedSuppliers.includes(supplierId);
    if (isSelected) {
      setSelectedSuppliers(selectedSuppliers.filter((id) => id !== supplierId));
    } else {
      setSelectedSuppliers([...selectedSuppliers, supplierId]);
    }
  };

  const handleUpdateSupplier = async () => {
    try {
      // Update the selected supplier
      await axios.put(`${server}supplier/${editingSupplier}`, {
        Supplier_name: editSupplierValues.Supplier_name,
        Contact_person: editSupplierValues.Contact_person,
        Supplier_id: editSupplierValues.Supplier_id,
        Location: editSupplierValues.Location,
        Email: editSupplierValues.Email,
      });

      // Refresh the supplier list after update
      const response = await axios.get(`${server}supplier`);
      setSuppliers(response.data);

      // Clear editing state
      setEditingSupplier(null);
      setEditSupplierValues({
        Supplier_name: '',
        Contact_person: '',
        Supplier_id: '',
        Location: '',
        Email: '',
      });

      // Show success message
      toast.success('Supplier updated successfully!');
    } catch (error) {
      console.error('Error updating supplier:', error);
      // Show error message
      toast.error('Failed to update supplier.');
    }
  };

  const handleCancelEditSupplier = () => {
    setEditingSupplier(null);
    setEditSupplierValues({
      Supplier_name: '',
      Contact_person: '',
      Supplier_id: '',
      Location: '',
      Email: '',
    });
  };

  const handleDeleteSupplier = async (supplierId) => {
    try {
      // Delete the selected supplier
      await axios.delete(`${server}supplier/${supplierId}`);

      // Refresh the supplier list after deletion
      const response = await axios.get(`${server}supplier`);
      setSuppliers(response.data);

      // Show success message
      toast.success('Supplier deleted successfully!');
    } catch (error) {
      console.error('Error deleting supplier:', error);
      // Show error message
      toast.error('Failed to delete supplier.');
    }
  };

  const handleDeleteSelected = async () => {
    try {
      // Delete selected suppliers
      await Promise.all(
        selectedSuppliers.map(async (supplierId) => {
          await axios.delete(`${server}supplier/${supplierId}`);
        })
      );

      // Refresh the supplier list after deletion
      const response = await axios.get(`${server}supplier`);
      setSuppliers(response.data);

      // Clear selected suppliers
      setSelectedSuppliers([]);

      // Show success message
      toast.success('Suppliers deleted successfully!');
    } catch (error) {
      console.error('Error deleting suppliers:', error);
      // Show error message
      toast.error('Failed to delete suppliers.');
    }
  };

  const handleEditSupplier = (supplierId) => {
    const supplierToEdit = suppliers.find((supplier) => supplier._id === supplierId);
    setEditingSupplier(supplierId);
    setEditSupplierValues({
      Supplier_name: supplierToEdit.Supplier_name,
      Contact_person: supplierToEdit.Contact_person,
      Supplier_id: supplierToEdit.Supplier_id,
      Location: supplierToEdit.Location,
      Email: supplierToEdit.Email,
    });
  };

  return (
    <div className="table-container">
      <Navbar />
      <h4> All Suppliers</h4>
      <div className="logo-container">
        <img src={img} alt="Logo" style={{ width: '100px', height: 'auto'}} />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="checkbox-column">
              <input
                type="checkbox"
                checked={selectedSuppliers.length === suppliers.length}
                onChange={() => {
                  if (selectedSuppliers.length === suppliers.length) {
                    setSelectedSuppliers([]);
                  } else {
                    setSelectedSuppliers(suppliers.map((supplier) => supplier._id));
                  }
                }}
              />
            </th>
            <th>Supplier Name</th>
            <th>Phone Number</th>
            <th>Supplier ID</th>
            <th>Category</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
  
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier._id} className={editingSupplier === supplier._id ? 'editing-row' : ''}>
              <td className="checkbox-column">
                <Form.Check
                  type="checkbox"
                  checked={selectedSuppliers.includes(supplier._id)}
                  onChange={() => handleCheckboxChange(supplier._id)}
                />
              </td>
              <td>
                {editingSupplier === supplier._id ? (
                  <Form.Control
                    type="text"
                    value={editSupplierValues.Supplier_name}
                    onChange={(e) =>
                      setEditSupplierValues({
                        ...editSupplierValues,
                        Supplier_name: e.target.value,
                      })
                    }
                  />
                ) : (
                  <span className="supplier-name">{supplier.Supplier_name}</span>
                )}
              </td>
              <td>
                {editingSupplier === supplier._id ? (
                  <Form.Control
                    type="text"
                    value={editSupplierValues.Phone_Number}
                    onChange={(e) =>
                      setEditSupplierValues({
                        ...editSupplierValues,
                        Phone_Number: e.target.value,
                      })
                    }
                  />
                ) : (
                  supplier.Phone_Number
                )}
              </td>
              <td>
                {editingSupplier === supplier._id ? (
                  <Form.Control
                    type="text"
                    value={editSupplierValues.Supplier_id}
                    onChange={(e) =>
                      setEditSupplierValues({
                        ...editSupplierValues,
                        Supplier_id: e.target.value,
                      })
                    }
                  />
                ) : (
                  supplier.Supplier_id
                )}
              </td>
              <td>
                {editingSupplier === supplier._id ? (
                  <Form.Control
                    type="text"
                    value={editSupplierValues.Category}
                    onChange={(e) =>
                      setEditSupplierValues({
                        ...editSupplierValues,
                        Category: e.target.value,
                      })
                    }
                  />
                ) : (
                  supplier.Category
                )}
              </td>
              <td>
                {editingSupplier === supplier._id ? (
                  <Form.Control
                    type="text"
                    value={editSupplierValues.Email}
                    onChange={(e) =>
                      setEditSupplierValues({
                        ...editSupplierValues,
                        Email: e.target.value,
                      })
                    }
                  />
                ) : (
                  supplier.Email
                )}
              </td>
              <td>
                {editingSupplier === supplier._id ? (
                  <>
                    <BsPen className="pen-icon" size={20} onClick={handleUpdateSupplier} title="Save" />
                    <Button variant="secondary" size="sm" onClick={handleCancelEditSupplier}>
                      Cancel
                    </Button>
                    <BsTrash
                      className="delete-icon"
                      size={20}
                      onClick={() => handleDeleteSupplier(supplier._id)}
                      title="Delete"
                    />
                  </>
                ) : (
                  <>
                    <BsPen
                      className="pen-icon"
                      size={20}
                      onClick={() => handleEditSupplier(supplier._id)}
                      title="Edit"
                    />
                    <span style={{ marginLeft: '5px' }}>Edit</span>
                    <BsTrash
                      className="delete-icon"
                      size={20}
                      onClick={() => handleDeleteSupplier(supplier._id)}
                      title="Delete"
                    />
                    <span style={{ marginLeft: '5px' }}>Delete</span>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="button-container">
        <Button
          variant="primary"
          onClick={handleDeleteSelected}
          className="custom-button"
          disabled={selectedSuppliers.length === 0}
        >
          <span style={{ fontWeight: 'bold', color: 'black' }}>Delete Selected</span>
        </Button>
        <Link to="/add-suppliers">
          <Button variant="primary" className="custom-button">
            <span style={{ fontWeight: 'bold', color: 'black' }}>Add Supplier</span>
          </Button>
        </Link>
      </div>
      <ToastContainer />
      <style jsx>{`
        .table-container {
          width: 80%;
          height: 100%;
          overflow: auto;
            margin-left: 250px; 
            padding: 20px;
            
        }
  
        .logo-container {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 10px;
        }
  
        .logo {
          width: 100px; /* Adjust width as needed */
          height: auto; /* Maintain aspect ratio */
        }
  
        .button-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 25px;
          color: #fff;
        }
  
        .add-supplier-button {
          margin-left: 10px;
        }
  
        .checkbox-column {
          width: 5%;
        }
  
        .supplier-name {
          font-weight: bold;
        }
  
        .pen-icon {
          cursor: pointer;
          margin-right: 5px;
        }
  
        .delete-icon {
          cursor: pointer;
          margin-left: 5px;
        }
  
        .editing-row {
          background-color: #eaf0f6; /* Light blue shade for editing row */
        }
  
        /* Table styles */
        .table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
  
        .table th,
        .table td {
          padding: 10px;
          border: 1px solid #ccc;
          text-align: left;
        }
  
        .table th {
          background-color: hsl(248, 86%, 15%);
          color: white;
        }
  
        .table tr:nth-child(even) {
          background-color: #f2f2f2;
        }
  
        h4 {
          font-size: 1.5em;
          margin-bottom: 15px;
        }
  
        /* Button styles */
        .custom-button {
          font-size: 18px; /* Increase font size */
          padding: 12px 20px; /* Increase padding for larger size */
          background-color: #28a745;
          border-color: #28a745;
          margin-right: 0;
          margin-bottom: 100px;
          margin-top: 20px;
          color: black;
        }
  
        .custom-button:hover {
          background-color: #218838; /* Change to desired hover background color */
          border-color: #218838; /* Change to desired hover border color */
        }
      `}</style>
    </div>
  );
  };

export default ViewSuppliers;

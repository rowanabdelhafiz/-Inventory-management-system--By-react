
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import './view-product.css';
import { server } from '../server';
import { Link } from 'react-router-dom';
import { BsPen, BsTrash } from 'react-icons/bs';
import img from 'C:/Users/user/Desktop/Grad/Grad project/Client/front-end/src/components/Assest/logo.jpg';
// import 'C:/Users/user/Desktop/Grad/Grad project/Client/front-end/src/Button.css'
import Navbar from '../Navbar/navbar';


const ViewProduct = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editProductValues, setEditProductValues] = useState({
    Product_name: '',
    Quantity: '',
    // Product_id: '',
    Price: '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${server}product`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [selectedProducts]);

  const handleCheckboxChange = (productId) => {
    const isSelected = selectedProducts.includes(productId);
    if (isSelected) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleEdit = (productId) => {
    const productToEdit = products.find((product) => product._id === productId);
    setEditingProduct(productId);
    setEditProductValues({
      Product_name: productToEdit.Product_name,
      Quantity: productToEdit.Quantity,
      // Product_id: productToEdit.Product_id,
      Price: productToEdit.Price,
    });
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setEditProductValues({
      Product_name: '',
      Quantity: '',
      // Product_id: '',
      Price: '',
    });
  };

  const handleUpdate = async () => {
    try {
      // Update the selected product
      await axios.put(`${server}product/${editingProduct}`, {
        Product_name: editProductValues.Product_name,
        Quantity: editProductValues.Quantity,
        // Product_id: editProductValues.Product_id,
        Price: editProductValues.Price,
      });

      // Refresh the product list after update
      const response = await axios.get(`${server}product`);
      setProducts(response.data);

      // Clear editing state
      setEditingProduct(null);
      setEditProductValues({
        Product_name: '',
        Quantity: '',
        // Product_id: '',
        Price: '',
      });

      // Show success message
      toast.success('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      // Show error message
      toast.error('Failed to update product.');
    }
  };

  
  const handleDeleteSelected = async () => {
    try {
      // Delete selected products
      await Promise.all(
        selectedProducts.map(async (productId) => {
          await axios.delete(`${server}product/${productId}`);
        })
      );

      // Refresh the product list after deletion
      const response = await axios.get(`${server}product`);
      setProducts(response.data);

      // Clear selected products
      setSelectedProducts([]);

      // Show success message
      toast.success('Products deleted successfully!');
    } catch (error) {
      console.error('Error deleting products:', error);
      // Show error message
      toast.error('Failed to delete products.');
    }
  };
  const handleDelete = async (productId) => {
    try {
      // Delete the selected product
      await axios.delete(`${server}product/${productId}`);

      // Refresh the product list after deletion
      const response = await axios.get(`${server}product`);
      setProducts(response.data);

      // Show success message
      toast.success('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      // Show error message
      toast.error('Failed to delete product.');
    }
  };
  return (
    
    <div className="table-container">
      <Navbar />
      <h4>Products</h4>
      <div className="logo-container">
        <img src={img} alt="Logo" style={{ width: '100px', height: 'auto'}} />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="checkbox-column">
              <input
                type="checkbox"
                checked={selectedProducts.length === products.length}
                onChange={() => {
                  if (selectedProducts.length === products.length) {
                    setSelectedProducts([]);
                  } else {
                    setSelectedProducts(products.map((product) => product._id));
                  }
                }}
              />
            </th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className={editingProduct === product._id ? 'editing-row' : ''}>
              <td className="checkbox-column">
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(product._id)}
                  onChange={() => handleCheckboxChange(product._id)}
                />
              </td>
              <td>
                {editingProduct === product._id ? (
                  <Form.Control
                    type="text"
                    value={editProductValues.Product_name}
                    onChange={(e) =>
                      setEditProductValues({
                        ...editProductValues,
                        Product_name: e.target.value,
                      })
                    }
                  />
                ) : (
                  <span className="product-name">{product.Product_name}</span>
                )}
              </td>
              <td>
                {editingProduct === product._id ? (
                  <Form.Control
                    type="text"
                    value={editProductValues.Quantity}
                    onChange={(e) =>
                      setEditProductValues({
                        ...editProductValues,
                        Quantity: e.target.value,
                      })
                    }
                  />
                ) : (
                  product.Quantity
                )}
              </td>
              <td>
                {editingProduct === product._id ? (
                  <Form.Control
                    type="text"
                    value={editProductValues.Price}
                    onChange={(e) =>
                      setEditProductValues({
                        ...editProductValues,
                        Price: e.target.value,
                      })
                    }
                  />
                ) : (
                  product.Price
                )}
              </td>
              <td>
                {editingProduct === product._id ? (
                  <>
                    <BsPen className="pen-icon" size={20} onClick={handleUpdate} title="Save" />
                    <Button variant="secondary" size="sm" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                    <BsTrash className="delete-icon" size={20} onClick={() => handleDelete(product._id)} title="Delete" />
                  </>
                ) : (
                  <>
                    <BsPen className="pen-icon" size={20} onClick={() => handleEdit(product._id)} title="Edit" />
                    <span style={{ marginLeft: '5px' }}>Edit</span>
                    <BsTrash className="delete-icon" size={20} onClick={() => handleDelete(product._id)} title="Delete" />
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
          onClick={handleDeleteSelected}
          variant="primary"
          className="custom-button"
          disabled={selectedProducts.length === 0}
        >
          <span style={{ fontWeight: 'bold', color: 'black' }}>Delete Selected</span>
        </Button>
        <Link to="/product">
          <Button variant="primary" className="custom-button">
            <span style={{ fontWeight: 'bold', color: 'black' }}>Add Product</span>
          </Button>
        </Link>
      </div>
      <ToastContainer />
      <style jsx>{`
        .table-container {
         align-items: center;
        justify-content: cente;
          overflow: auto;
            margin-left: 250px; /* Adjust according to sidebar width */
  padding: 20px
        }
  .center-table {
        width: 80%;
        margin-top: 20px;
      }
        .button-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 25px;
          color: #fff;
        }
  
        .checkbox-column {
          width: 5%;
        }
  
        .product-name {
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
    .logo-container {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 10px;
        }
  
        .logo {
          width: 100px; /* Adjust width as needed */
          height: auto; /* Maintain aspect ratio */
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
          margin-bottom: 20px;
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


export default ViewProduct;

import React, { useState } from 'react';
import axios from 'axios';
import styled, { css } from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import img from 'C:/Users/user/Desktop/Grad/Grad project/Client/front-end/src/components/Assest/form.jpg';
import { server } from '../server';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/navbar';

const BackgroundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 80vh;
  background-image: url(${img});
  background-size: cover;
  background-position: center;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 80px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;

  input[type='text'] {
    width: 100%;
    padding: 15px;
    margin-bottom: 19px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    box-sizing: border-box;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 12px;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  font-size: 1rem;
  transition: all 0.3s;
  background-color: black;
  color: white;

  ${(props) =>
    props.view &&
    css`
      padding: 16px 24px;
      font-weight: bold;
    `}

  &:hover {
    background-color: grey;
    color: white;
    border: 2px solid white;
  }
`;


const Supplier = () => {
  const [supplierData, setSupplierData] = useState({
    Supplier_name: '',
    Phone_Number: '',
    Supplier_id: '',
    Category: '',
    Email: '',
  });

  const { Supplier_name, Phone_Number, Supplier_id, Category, Email } = supplierData;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`${server}supplier`);
      const existingSuppliers = response.data;

      const existingSupplier = existingSuppliers.find(
        (supplier) => supplier.Supplier_id === Supplier_id
      );

      if (existingSupplier) {
        showToast('Supplier with the same ID already exists.', 'error');
      } else {
        const newSupplier = {
          Supplier_name,
          Phone_Number,
          Supplier_id,
          Category,
          Email,
        };

        const createResponse = await axios.post(`${server}supplier`, newSupplier);

        if (createResponse.data) {
          showToast('Supplier added successfully!');
        } else {
          showToast('Failed to add supplier.', 'error');
        }

        setSupplierData({
          Supplier_name: '',
          Phone_Number: '',
          Supplier_id: '',
          Category: '',
          Email: '',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      showToast('An error occurred while processing your request.', 'error');
    }
  };

  const handleInputChange = (e) => {
    setSupplierData({
      ...supplierData,
      [e.target.name]: e.target.value,
    });
  };

  const showToast = (message, type = 'success') => {
    if (type === 'success') {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return (
    <div>
      <Navbar />
      <BackgroundContainer>
        <Container>
          <FormContainer>
            <Title>Add Supplier</Title>
            <Form onSubmit={handleSubmit}>
              <input
                type="text"
                name="Supplier_name"
                placeholder="Supplier Name"
                onChange={handleInputChange}
                value={Supplier_name}
                required
              />
              <input
                type="text"
                name="Phone_Number"
                placeholder="Phone Number"
                onChange={handleInputChange}
                value={Phone_Number}
                required
              />
              <input
                type="text"
                name="Supplier_id"
                placeholder="Supplier ID"
                onChange={handleInputChange}
                value={Supplier_id}
                required
              />
              <input
                type="text"
                name="Category"
                placeholder="Category"
                onChange={handleInputChange}
                value={Category}
                required
              />
              <input
                type="text"
                name="Email"
                placeholder="Email"
                onChange={handleInputChange}
                value={Email}
                required
              />
              <ButtonContainer>
                <Button type="submit">Add Supplier</Button>
                <Link to="/view-suppliers">
                  <Button type="button" view>
                    View Supplier
                  </Button>
                </Link>
              </ButtonContainer>
            </Form>
            <ToastContainer />
          </FormContainer>
        </Container>
      </BackgroundContainer>
    </div>
  );
};

export default Supplier;

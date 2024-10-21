import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { server } from '../server';
import Button from 'react-bootstrap/Button';
import backgroundImage from 'C:/Users/user/Desktop/Grad/Grad project/Client/front-end/src/components/Assest/form.jpg';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/navbar';
import styled, { css } from 'styled-components';

const BackgroundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 80vh;
  background-image: url(${backgroundImage});
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
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 10px;
  }

  input[type='text'],
  select {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    box-sizing: border-box;
  }
`;
const StyledButton = styled(Button)`
  padding: 12px;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  font-size: 1rem;
  transition: all 0.3s;
  background-color: black;
  color: white;
  

  ${(props) =>
    props.addProduct &&
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
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;


const Product = () => {
  const [Product_name, setProduct_name] = useState('');
  const [Quantity, setQuantity] = useState('');
  const [Price, setPrice] = useState('');
  const [Subcategory, setSubcategory] = useState('');
  const [Subsubcategory, setSubsubcategory] = useState('');

  const handleProductChange = (e) => {
    setProduct_name(e.target.value);
    setSubcategory('');
    setSubsubcategory('');
  };

  const handleSubcategoryChange = (e) => {
    setSubcategory(e.target.value);
    setSubsubcategory('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newProduct = {
        Product_name,
        Subcategory,
        Subsubcategory,
        Quantity,
        Price,
      };

      const createResponse = await axios.post(`${server}product`, newProduct);

      if (createResponse.data) {
        showToast('Product added successfully!');
      } else {
        showToast('Failed to add the product.', 'error');
      }

      // Clear form fields
      setProduct_name('');
      setQuantity('');
      setPrice('');
      setSubcategory('');
      setSubsubcategory('');
    } catch (error) {
      console.error('Error:', error);
      showToast('An error occurred while processing your request.', 'error');
    }
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
            <Title>Add Product</Title>
            <Form onSubmit={handleSubmit}>
              <label>
                Product Name <br />
                <select
                  className="form-control"
                  name="Product_name"
                  onChange={handleProductChange}
                  value={Product_name}
                >
                  <option value="" disabled>
                    Select Product Name
                  </option>
                  <option value="حديد">حديد</option>
                  <option value="قطاعات">قطاعات</option>
                  <option value="الاكسسوارات">الاكسسوارات</option>
                </select>
              </label>
              {Product_name === 'قطاعات' && (
                <label>
                  قطاعات <br />
                  <select
                    className="form-control"
                    name="Subcategory"
                    onChange={handleSubcategoryChange}
                    value={Subcategory}
                  >
                    <option value="" disabled>
                      اللون
                    </option>
                    <option value="ابيض">ابيض</option>
                    <option value="بيج">بيج</option>
                    <option value="رمادى">رمادى</option>
                    <option value="خشبي">خشبي</option>
                  </select>
                </label>
              )}
              {Product_name === 'حديد' && (
                <label>
                  حديد <br />
                  <select
                    className="form-control"
                    name="Subcategory"
                    onChange={handleSubcategoryChange}
                    value={Subcategory}
                  >
                    <option value="" disabled>
                      النوع
                    </option>
                    <option value="حديد مفصلي ">حديد مفصلي </option>
                    <option value="حديد جرار">حديد جرار</option>
                    <option value="سلك">سلك</option>
                  </select>
                </label>
              )}
  
              {Product_name === 'الاكسسوارات' && (
                <>
                  <label>
                    الاكسسوارات <br />
                    <select
                      className="form-control"
                      name="Subcategory"
                      onChange={handleSubcategoryChange}
                      value={Subcategory}
                    >
                      <option value="" disabled>
                        Select الاكسسوارات
                      </option>
                      <option value="سابولينات">سابولينات</option>
                      <option value="مقابض">مقابض</option>
                      <option value="مفصلات">مفصلات</option>
                      <option value="عجل">عجل</option>
                      <option value="كوالين">كوالين</option>
                      <option value="سلك فايبر">سلك فايبر</option>
                      <option value="سكاكات">سكاكات</option>
                    </select>
                  </label>
                  {Subcategory === 'سابولينات' && (
                    <label>
                      سابولينات <br />
                      <select
                        className="form-control"
                        name="Subsubcategory"
                        onChange={(e) => setSubsubcategory(e.target.value)}
                        value={Subsubcategory}
                      >
                        <option value="" disabled>
                          Select سابولينات
                        </option>
                        <option value="مفصلى">مفصلى</option>
                        <option value="جرار">جرار</option>
                        <option value="ابواب">ابواب</option>
                      </select>
                    </label>
                  )}
                  {Subcategory === 'مقابض' && (
                    <label>
                      مقابض <br />
                      <select
                        className="form-control"
                        name="Subsubcategory"
                        onChange={(e) => setSubsubcategory(e.target.value)}
                        value={Subsubcategory}
                      >
                        <option value="" disabled>
                          Select مقابض
                        </option>
                        <option value="بارز">بارز</option>
                        <option value="غاطس">غاطس</option>
                      </select>
                    </label>
                  )}
                  {Subcategory === 'مفصلات' && (
                    <label>
                      مفصلات <br />
                      <select
                        className="form-control"
                        name="Subsubcategory"
                        onChange={(e) => setSubsubcategory(e.target.value)}
                        value={Subsubcategory}
                      >
                        <option value="" disabled>
                          Select مفصلات
                        </option>
                        <option value="10cm">10cm</option>
                        <option value="7.5cm">7.5cm</option>
                      </select>
                    </label>
                  )}
                  {Subcategory === 'عجل' && (
                    <label>
                      عجل <br />
                      <select
                        className="form-control"
                        name="Subsubcategory"
                        onChange={(e) => setSubsubcategory(e.target.value)}
                        value={Subsubcategory}
                      >
                        <option value="" disabled>
                          Select عجل
                        </option>
                        <option value="50k">50k</option>
                        <option value="100k">100k</option>
                        <option value="عجل ضرفة سلك">عجل ضرفة سلك</option>
                      </select>
                    </label>
                  )}
                  {Subcategory === 'كوالين' && (
                    <label>
                      كوالين <br />
                      <select
                        className="form-control"
                        name="Subsubcategory"
                        onChange={(e) => setSubsubcategory(e.target.value)}
                        value={Subsubcategory}
                      >
                        <option value="" disabled>
                          Select كوالين
                        </option>
                        <option value="سلندر">سلندر</option>
                        <option value="أشاره">أشاره</option>
                      </select>
                    </label>
                  )}
                  {Subcategory === 'سلك فايبر' && (
                    <label>
                      سلك فايبر<br />
                      <select
                        className="form-control"
                        name="Subsubcategory"
                        onChange={(e) => setSubsubcategory(e.target.value)}
                        value={Subsubcategory}
                      >
                        <option value="" disabled>
                          Select سلك فايبر
                        </option>
                        <option value="80 متر">80 متر</option>
                        <option value="120 متر">120 متر</option>
                        <option value="160 متر">160 متر</option>
                        <option value="180 متر">180 متر</option>
                      </select>
                    </label>
                  )}
                </>
              )}
              <label>
                Quantity <br />
                <input
                  type="text"
                  className="form-control"
                  name="Quantity"
                  onChange={(e) => setQuantity(e.target.value)}
                  value={Quantity}
                />
              </label>
              <label>
                Price <br />
                <input
                  type="text"
                  className="form-control"
                  name="Price"
                  onChange={(e) => setPrice(e.target.value)}
                  value={Price}
                />
              </label>
              <ButtonContainer>
                <StyledButton type="submit" variant="primary" addProduct>
                  Add Product
                </StyledButton>
                <Link to="/view-product">
                  <StyledButton className="add-supplier-button">View Product</StyledButton>
                </Link>
              </ButtonContainer>
            </Form>
            <ToastContainer />
          </FormContainer>
        </Container>
      </BackgroundContainer>
    </div>
  );
}
export default Product;

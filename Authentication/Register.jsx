import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Navigate, Link } from 'react-router-dom';
import Navbar2 from "../Home2/Navbar2/Navbar2";
import Logo from '../Assest/logo.jpg';
import Image from '../Assest/img.jpg';  // Adjust path as per your project structure
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  background-image: url(${Image});
  background-size: cover;
  background-position: center;
  backdrop-filter: blur(20px);
`;


const RegisterForm = styled.form`
  width: 100%;
  max-width: 800px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.5);  /* Semi-transparent background */
  border: 1px solid rgba(255, 255, 255, 0.18);  /* Slightly visible border */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(10px);  /* Blurring the form background */
  box-sizing: border-box;
`;

const LoginLogo = styled.div`
  margin-bottom: 20px;
  text-align: center;

  img {
    width: 180px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-weight: bold;
  color: #666; /* Gray text color */
`;

const InputField = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  background-color: rgba(255, 255, 255, 0.5);
`;

const Button = styled.button`
  padding: 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const PasswordInputDiv = styled.div`
  position: relative;

  svg {
    font-size: 20px;
    position: absolute;
    right: 10px;
    bottom: 35px;
    cursor: pointer;
    outline: none;
  }
`;

const AlreadyHaveAccount = styled.div`
  margin-top: 20px;
  text-align: center;
`;
const Register = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [registered, setRegistered] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/users', formData);
      console.log(response.data);  // Handle successful registration
      setRegistered(true);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Something went wrong');
      } else if (error.request) {
        setError('No response received from server');
      } else {
        setError('Error in setting up request');
      }
      console.error('Error message:', error.message);
    }
  };

  if (registered) {
    return <Navigate to="/Login" />;
  }

  return (
    <div><Navbar2/>
    <Container>
      <RegisterForm onSubmit={handleSubmit}>
        <LoginLogo>
          <img src={Logo} alt="Logo" />
        </LoginLogo>
        <h2>Create Your Account</h2>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <FormGroup>
          <Label>First Name</Label>
          <InputField type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label>Last Name</Label>
          <InputField type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <InputField type="email" name="email" value={formData.email} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label>Username</Label>
          <InputField type="text" name="username" value={formData.username} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <PasswordInputDiv>
            <InputField type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} required />
            {showPassword ? (
              <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
            ) : (
              <FaEye onClick={() => setShowPassword(!showPassword)} />
            )}
          </PasswordInputDiv>
        </FormGroup>
        <Button type="submit">Register</Button>
        <AlreadyHaveAccount>
          Already have an account? <Link to="/Login">Login now</Link>
        </AlreadyHaveAccount>
      </RegisterForm>
    </Container>
    </div>
  );
};

export default Register;

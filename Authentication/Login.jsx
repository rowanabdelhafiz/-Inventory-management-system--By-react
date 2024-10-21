import React, { useState , useContext} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Logo from '../Assest/logo.jpg';
import Navbar2 from "../Home2/Navbar2/Navbar2";
import { Link } from 'react-router-dom';
import GoogleSvg from '../Assest/GoogleSvg.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import "./Login.css";
import { UserContext } from '../UserContext';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 80px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const LoginLogo = styled.div`
  margin-bottom: 1px;
   text-align: center; 

  img {
    width: 180px;
  }
`;

const LoginTitle = styled.h2`
  font-size: 3rem;
  margin-bottom: 10px;
`;

const LoginDescription = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

const LoginForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;

  input[type='email'],
  input[type='password'],
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

const PasswordInputDiv = styled.div`
  position: relative;

  svg {
    font-size: 20px;
    position: absolute;
    right: 10px;
    top: 40%;
    transform: translateY(-50%);
    cursor: pointer;
    outline: none;
  }
`;

const LoginOptions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const RememberDiv = styled.div`
  display: flex;
  align-items: center;
  column-gap: 5px;

  label {
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    margin-top: 2px;
  }
`;

const ForgotPasswordLink = styled.a`
  text-decoration: none;
  font-size: 1.3rem;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginButtons = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  button {
    padding: 12px;
    border-radius: 4px;
    cursor: pointer;
    border: none;
    font-size: 1rem;
    transition: all 0.3s;

    &:first-child {
      background-color: black;
      color: white;

      &:hover {
        color: black;
        background-color: white;
        border: 2px solid black;
      }
    }

    &:last-child {
      background-color: #f0f0f0;
      display: flex;
      justify-content: center;
      align-items: center;
      column-gap: 10px;

      img {
        width: 20px;
      }

      &:hover {
        background-color: #c4c4c457;
      }
    }
  }
`;

const LoginBottomParagraph = styled.p`
  text-align: center;
  font-size: 1rem;

  a {
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
    
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const { setUser } = useContext(UserContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/users/login', formData);
      const { username, role } = response.data;
      setRole(role);
      setLoggedIn(true);
      setUser({ username });
      toast.success('Login successful');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        if (error.response.data.message === 'User not found') {
          toast.error('Email does not exist. Create your account now.');
        } else if (error.response.data.message === 'Invalid password') {
          toast.error('Wrong password. Please try again.');
        } else {
          toast.error('Something went wrong. Please try again later.');
        }
      } else {
        console.error('Error:', error.message);
        toast.error('Failed to log in. Please try again.');
      }
    }
  };
  if (loggedIn) {
    if (role === 'admin') {
      return <Navigate to="/Home" />;
    } else {
      return <Navigate to="/" />;
    }
  }

  return (
    <div><Navbar2/>
    <Container>
      <FormContainer>
        <LoginLogo>
          <img src={Logo} alt="Logo" />
        </LoginLogo>
        <LoginTitle>Welcome back!</LoginTitle>
        <LoginDescription>Please enter your details</LoginDescription>
        <LoginForm onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <PasswordInputDiv>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {showPassword ? (
              <FaEyeSlash
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              />
            ) : (
              <FaEye
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              />
            )}
          </PasswordInputDiv>
          <LoginOptions>
            <RememberDiv>
              <input type="checkbox" id="remember-checkbox" />
              <label htmlFor="remember-checkbox">Remember</label>
            </RememberDiv>
            <ForgotPasswordLink href="#">Forgot password?</ForgotPasswordLink>
          </LoginOptions>
          <LoginButtons>
            <button type="submit">Log In</button>
            <button type="button" className="login-google-button">
              <img src={GoogleSvg} alt="Google" />
              Log In with Google
            </button>
          </LoginButtons>
        </LoginForm>
        <LoginBottomParagraph>
          Don't have an account? <Link to="/Register">Sign Up</Link>
        </LoginBottomParagraph>
      </FormContainer>
    </Container>
    </div>
  );
};

export default Login;

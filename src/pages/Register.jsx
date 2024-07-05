import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { registerUser } from '../slices/weatherSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.get('http://localhost:3000/users');
      const users = response.data;
      const userExists = users.some(u => u.username === username);
      if (userExists) {
        alert('Username already taken');
      } else {
        const newUser = { username, password };
        await axios.post('http://localhost:3000/users', newUser);
        dispatch(registerUser(newUser));
        navigate('/login');
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div className="container">
      <form className="register-form" onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <div className="password-container">
          <input
            type={passwordVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <FontAwesomeIcon
            icon={passwordVisible ? faEyeSlash : faEye}
            onClick={togglePasswordVisibility}
            className="password-icon"
          />
        </div>

        <div className="password-container">
          <input
            type={confirmPasswordVisible ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
          <FontAwesomeIcon
            icon={confirmPasswordVisible ? faEyeSlash : faEye}
            onClick={toggleConfirmPasswordVisibility}
            className="password-icon"
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;

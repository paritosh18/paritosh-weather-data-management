import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import users from '../data/users.json';
import { useDispatch } from 'react-redux';
import { registerUser } from '../slices/weatherSlice';

const Register = ({onRegister}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    const userExists = users.some(u => u.username === username);
    if (userExists) {
      alert('Username already taken');
    } else {
      const newUser = { username, password };
      users.push(newUser); // Save the new user to your data store
      dispatch(registerUser(newUser));
      navigate('/login');
    }
  };

  return (
    <div className="container">
      <form className="register-form" onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;

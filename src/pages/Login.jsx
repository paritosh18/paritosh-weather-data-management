import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginUser } from '../slices/weatherSlice';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("Login component received onLogin: ", onLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('http://localhost:3000/users');
      const users = response.data;
      console.log("Users in Login component: ", users);

      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        dispatch(loginUser(user));
        if (typeof onLogin === 'function') {
          onLogin(); 
          navigate('/'); // Call onLogin when user is authenticated
        } else {
          console.error("onLogin is not a function");
        }
      } else {
        alert('Invalid credentials. If you are not registered, please register.');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };


  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="container">
      <form className="login-form" onSubmit={handleSubmit}>
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

        <button type="submit">Login</button>
        <button type="button" onClick={handleRegister}>Register</button>
      </form>
    </div>
  );
};

export default Login;

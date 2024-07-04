import React, { useState } from 'react';
import users from '../data/users.json';
import { useDispatch } from 'react-redux';
import { loginUser } from '../slices/weatherSlice';
import { useNavigate } from 'react-router-dom';

//It passes handleLogin as the onLogin prop to the Login component.
const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("Login component received onLogin: ", onLogin);
  console.log("Users in Login component: ", users);

  const handleSubmit = (e) => {
    
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      dispatch(loginUser(user));
      if (typeof onLogin === 'function') {
        onLogin(); 
        navigate('/') // Call onLogin when user is authenticated
      } else {
        console.error("onLogin is not a function");
      }
    } else {
      alert('Invalid credentials. If you are not registered, please register.');
    }
  };

 
  const handleRegister = () => {
    navigate('/register');
  };
  return (
    <div className="container">
      <form className="login-form" onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Login</button>
        <button type="button" onClick={handleRegister}>Register</button>
      </form>
    </div>
  );
};

export default Login;
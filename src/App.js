import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import LogWeatherButton from './components/LogWeatherButton';
import WeatherList from './components/WeatherList';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in from local storage
    const isLoggedIn = localStorage.getItem('loggedIn');
    if (isLoggedIn) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
    localStorage.setItem('loggedIn', 'true'); // Save login state to local storage
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('loggedIn'); // Remove login state from local storage
  };



  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin}  />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                loggedIn ? (
                  <div>
                    <LogWeatherButton />
                    <WeatherList />
                    <button className="btn-logout"onClick={handleLogout}>Logout</button> {/* Add Logout Button */}
                  </div>
                ) : (
                  <Login onLogin={handleLogin}  />
                )
              }
            />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
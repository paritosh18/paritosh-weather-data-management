import React, { useState, useEffect } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import store from './store/store';
import LogWeatherButton from './components/LogWeatherButton';
import WeatherList from './components/WeatherList';
import Login from './pages/Login';
import Register from './pages/Register';
import { resetWeatherData } from './slices/weatherSlice';
import './index.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const weatherData = useSelector((state) => state.weather.data);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if user is logged in from local storage
    const isLoggedIn = localStorage.getItem('loggedIn');
    if (isLoggedIn) {
      setLoggedIn(true);
    }
    const savedWeatherData = JSON.parse(localStorage.getItem('weatherData'));
    if (savedWeatherData) {
      dispatch(resetWeatherData(savedWeatherData));
    }
    setLoading(false); // Set loading to false after initial check
  }, [dispatch]);

  const handleLogin = () => {
    setLoggedIn(true);
    localStorage.setItem('loggedIn', 'true'); // Save login state to local storage
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('weatherData'); // Remove login state from local storage
  };

  useEffect(() => {
    // Save weather data to local storage whenever it changes
    if (weatherData) {
      localStorage.setItem('weatherData', JSON.stringify(weatherData));
    }
  }, [weatherData]);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while checking login state
  }

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                loggedIn ? (
                  <div>
                    <LogWeatherButton />
                    <WeatherList />
                    <button className="btn-logout" onClick={handleLogout}>Logout</button> {/* Add Logout Button */}
                  </div>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="*"
              element={
                loggedIn ? <Navigate to="/" /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;

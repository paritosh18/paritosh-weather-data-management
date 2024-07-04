import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logWeatherData } from '../slices/weatherSlice';
import fetchWeatherData from '../utils/fetchWeatherData';

const LogWeatherButton = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    let interval;
    if (city) {
      interval = setInterval(async () => {
        const data = await fetchWeatherData(city);
        if (data) {
          setWeatherData(data);
        }
      }, 2000);
    }

    return () => clearInterval(interval);
  }, [city]);

  const handleLogWeather = () => {
    if (weatherData) {
      dispatch(logWeatherData(weatherData));
      setWeatherData(null); // Clear weatherData state after logging
    }
  };

  return (
    <div className="container-log">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={handleLogWeather}>Log Weather Data</button>
      {weatherData && (
        <div>
          <p>City: {weatherData.city}</p>
          <p>Temperature: {weatherData.temperature}°C</p>
          <p>Pressure: {weatherData.pressure} hPa</p>
          <p>Humidity: {weatherData.humidity}%</p>
          <p>Wind Speed: {weatherData.windSpeed} m/s</p>
          <p>Wind Degree: {weatherData.windDegree}°</p>
        </div>
      )}
    </div>
  );
};

export default LogWeatherButton;
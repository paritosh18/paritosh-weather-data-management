import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteWeatherData } from '../slices/weatherSlice';

const WeatherList = () => {
  const weatherData = useSelector(state => state.weather.data); //weather slice me data ki property to access karne ke liye //
  const dispatch = useDispatch();

  const handleDelete = (index) => {
    dispatch(deleteWeatherData(index));
  };

  return (
    <div className="container weather-container">
      {weatherData.length > 0 ? (
        <div>
          <h2>Weather Data List</h2>
          <ul>
            {weatherData.map((data, index) => (
              <li key={index}>
                {data.city} - {data.temperature}°C, {data.pressure} hPa, {data.humidity}%, {data.windSpeed} m/s, {data.windDegree}°
                <button onClick={() => handleDelete(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No weather data available</p>
      )}
    </div>
  );
};

export default WeatherList;

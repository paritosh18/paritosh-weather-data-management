const fetchWeatherData = async (city) => {
    const apiKey = 'b4f41e21323c0cdb33ce542aef8eeb41'; 
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
  
    if (data.cod === '404') {
      alert('City not found');
      return null;
    } else {
      return {
        city: data.name,
        temperature: data.main.temp,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        windDegree: data.wind.deg,
      };
    }
  };
  
  export default fetchWeatherData;
  
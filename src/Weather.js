import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import './CSS/Weather.css'
import WindAnimation from './Components/WindAnimation';
import HumidityAnimation from './Components/HumidityAnimation';
import WeatherCard from './Components/WeatherCard';

import { fetchWeatherData, fetchCitySuggestions } from './Api/WeatherApi';

const Weather = () => {
  const [city, setCity] = useState('');
  const [date, setDate] = useState(() =>
    new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  );
  const [suggestions, setSuggestions] = useState([]);

  const [weather, setWeather] = useState({
    location: 'Rabat, Morocco',
    temperature: 20,
    condition: 'broken clouds',
    icon: '/images/day.png',
    wind: 2.06,
    humidity: 88
  });

  const [forecastData, setForecastData] = useState([]);

  const searchCity = async (overrideCity) => {
    const selectedCity = overrideCity || city;
    try {
      const data = await fetchWeatherData(selectedCity);
      if (data) {
        setWeather(data.weather);
        setForecastData(data.forecast);
      }
    } catch (error) {
      alert(error.message || 'Failed to fetch weather data.');
      console.error(error);
    }
  };

  useEffect(() => {
    setCity('Rabat');
    searchCity('Rabat');
  }, []);

  return (
    <div className="weather-container">
      <div className="innertext">
        <input
          type="text"
          id="cityInput"
          value={city}
          onChange={async (e) => {
            const value = e.target.value;
            setCity(value);
            if (value.length >= 2) {
              const results = await fetchCitySuggestions(value);
              setSuggestions(results);
            } else {
              setSuggestions([]);
            }
          }}
          placeholder="enter your city"
          className="city-input"
        />
        <ul className="suggestions-dropdown">
          {suggestions.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                setCity(item.name);
                setSuggestions([]);
                searchCity(item.name);
              }}
              className="suggestion-item"
            >
              {item.name}, {item.country}
            </li>
          ))}
        </ul>

        <button onClick={searchCity} className="search-button">
          <FaSearch className="Fasearch" />
        </button>
      </div>

      <h1 className="location">{weather.location}</h1>
      <p className="date">{date}</p>

      <div className="weather-main">
        <img
          src={weather.icon.startsWith('//') ? 'https:' + weather.icon : weather.icon}
          alt="weather"
          className="weather-icon"
        />
        <div className="weather-info">
          <div className="temp">
            <h2 className="temperature">{Math.round(weather.temperature)}</h2>
            <p>°C | °F</p>
          </div>
          <p className="description">{weather.condition}</p>
        </div>
      </div>

      <div className="weather-details">
        <WindAnimation speed={weather.wind} />
        <HumidityAnimation percentage={weather.humidity} />
      </div>

      <p className="forecast-title">5-Day Forecast</p>

      <div className="weather-forecast">
        {forecastData.map((data, index) => (
          <WeatherCard key={index} {...data} />
        ))}
      </div>
    </div>
  );
};

export default Weather;

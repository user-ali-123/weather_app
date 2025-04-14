import React from 'react';

function WeatherCard({ day, icon, low, high }) {
  return (
    <div className="weather-card">
      <div className="day">{day}</div>
      <div className="icon">{icon}</div>
      <div className="temp">{low}° / {high}°</div>
    </div>
  );
}

export default WeatherCard;

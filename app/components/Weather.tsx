import React from "react";

const Weather = ({ weatherData }) => {
  // Spracovanie údajov o počasí a ich zobrazenie
  const temp = Math.round(weatherData.main.temp);
  const wind = Math.round(weatherData.wind.speed * 3.6); // convert to km/h

  return (
    <div>
      <h2>{weatherData.name}</h2>
      <div>
        <p>Teplota: {temp}°C</p>
        <p>Popis: {weatherData.weather[0].description}</p>
        <p>Vlhkosť: {weatherData.main.humidity}%</p>
        <p>Vietor: {wind} km/hod</p>
        <p>Icon: {weatherData.weather[0].icon}</p>
      </div>
    </div>
  );
};

export default Weather;

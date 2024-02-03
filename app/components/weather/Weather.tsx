import React from "react";
import Image from "next/image";
import clearSky from "../img/01d@2x.png";
import fewClouds from "../img/02d@2x.png";
import scatteredClouds from "../img/03d@2x.png";
import brokenClouds from "../img/04d@2x.png";
import showerRain from "../img/09d@2x.png";
import rain from "../img/10d@2x.png";
import thunderstorm from "../img/11d@2x.png";
import snow from "../img/13d@2x.png";
import mist from "../img/50d@2x.png";

const Weather = ({ weatherData }) => {
  // Spracovanie údajov o počasí a ich zobrazenie
  const temp = Math.round(weatherData.main.temp);
  const wind = Math.round(weatherData.wind.speed * 3.6); // convert m/s to km/h

  const getWeatherIcon = (iconCode) => {
    switch (iconCode) {
      case "01d":
        return clearSky;
      case "02d":
        return fewClouds;
      case "03d":
        return scatteredClouds;
      case "04d":
        return brokenClouds;
      case "09d":
        return showerRain;
      case "10d":
        return rain;
      case "11d":
        return thunderstorm;
      case "13d":
        return snow;
      case "50d":
        return mist;
      default:
        return null;
    }
  };

  return (
    <div>
      <h2>{weatherData.name}</h2>
      <div>
        <p>Teplota: {temp}°C</p>
        <p>Popis: {weatherData.weather[0].description}</p>
        <p>Vlhkosť: {weatherData.main.humidity}%</p>
        <p>Vietor: {wind} km/hod</p>
        <p className="icon">
          <Image
            src={getWeatherIcon(weatherData.weather[0].icon)}
            alt="Weather Icon"
            width={150}
            height={150}
          />
        </p>
      </div>
    </div>
  );
};

export default Weather;

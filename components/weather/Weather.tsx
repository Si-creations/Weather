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
import clearSky2 from "../img/01n@2x.png";
import fewClouds2 from "../img/02n@2x.png";
import scatteredClouds2 from "../img/03n@2x.png";
import brokenClouds2 from "../img/04n@2x.png";
import showerRain2 from "../img/09n@2x.png";
import rain2 from "../img/10n@2x.png";
import thunderstorm2 from "../img/11n@2x.png";
import snow2 from "../img/13n@2x.png";
import mist2 from "../img/50n@2x.png";
import { weatherDataPropsType } from "@/types/weatherDataType";
import style from "./weather.module.scss";
import DaylyForecast from "../daylyForecast/dailyForecast";

const Weather = ({
  weatherData,
  daylyForecastWeatherData,
}: weatherDataPropsType) => {
  const temp = Math.round(weatherData.main.temp);
  const wind = Math.round(weatherData.wind.speed * 3.6); // convert m/s to km/h
  const icon = weatherData.weather[0].icon;

  const getWeatherIcon = (iconCode: string) => {
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
      case "01n":
        return clearSky2;
      case "02n":
        return fewClouds2;
      case "03n":
        return scatteredClouds2;
      case "04n":
        return brokenClouds2;
      case "09n":
        return showerRain2;
      case "10n":
        return rain2;
      case "11n":
        return thunderstorm2;
      case "13n":
        return snow2;
      case "50n":
        return mist2;
      default:
        return clearSky;
    }
  };

  return (
    <div className={style.main}>
      <div>
        <h2>{weatherData.name}</h2>
        <p className="icon inline-block">
          <Image
            src={getWeatherIcon(icon)}
            alt="Weather Icon"
            width={150}
            height={150}
            priority={true}
          />
        </p>
        <p>{temp}°C</p>
        <p>{weatherData.weather[0].description}</p>
        <p>Vlhkosť: {weatherData.main.humidity}%</p>
        <p>Vietor: {wind} km/hod</p>
      </div>
      <DaylyForecast daylyForecastWeatherData={daylyForecastWeatherData} />
    </div>
  );
};

export default Weather;

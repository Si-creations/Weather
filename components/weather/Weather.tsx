"use client";
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
import { WeatherDataPropsType } from "@/types/weatherDataType";
import style from "./weather.module.scss";

const Weather = ({ weatherData }: WeatherDataPropsType) => {
  const temp = Math.round(weatherData.main.temp);
  const feelsLikeTemp = Math.round(weatherData.main.feels_like);
  const wind = Math.round(weatherData.wind.speed * 3.6); // convert m/s to km/h
  const icon = weatherData.weather[0].icon;

  const formatTime = (UTC: number) => {
    const utcValue = new Date(UTC * 1000);
    const formatedUtc = utcValue.toLocaleString().split(" ");
    const selectTime = formatedUtc[formatedUtc.length - 1]
      .split(":")
      .slice(0, 2)
      .join(":");

    return selectTime;
  };

  const sunrise = formatTime(weatherData.sys.sunrise);
  const sunset = formatTime(weatherData.sys.sunset);

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
        <h1>{weatherData.name}</h1>
        <div className="icon inline-block">
          <Image
            src={getWeatherIcon(icon)}
            alt="Weather Icon"
            width={150}
            height={150}
            priority={true}
          />
        </div>
        <p className={style.temp}>{temp}°C</p>
        <p className="mb-4">{weatherData.weather[0].description}</p>
        <div className="">
          <div className={style.flexbox}>
            <p>Pocitovo: {feelsLikeTemp}°C</p>

            <p>Vietor: {wind} km/hod</p>
          </div>
          <div className={style.line}></div>
          <div className={style.flexbox}>
            <p>Vlhkosť: {weatherData.main.humidity}%</p>
            <p>Tlak: {weatherData.main.pressure}mBar</p>
          </div>
          <div className={style.line}></div>
          <div className={style.flexbox}>
            <div className="flex items-center">
              <p>ICON</p>
              <div className={style.timeFlexbox}>
                <p>Vychod slnka</p>
                <p>{sunrise}</p>
              </div>
            </div>
            <div className="flex items-center">
              <p>ICON</p>
              <div className={style.timeFlexboxr}>
                <p>Zapad slnka</p>
                <p> {sunset}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;

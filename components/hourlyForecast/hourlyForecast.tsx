"use client";

import React from "react";
import {
  HourlyForecastWeatherDataType,
  HourlyForecastWeatherDataPropsType,
} from "@/types/hourlyDataTypes";
import style from "./hourlyForecast.module.scss";
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

const hourlyForecast = ({
  hourlyForecastWeatherData,
}: HourlyForecastWeatherDataPropsType) => {
  // console.log(hourlyForecastWeatherData);

  const adjustTimeWithTimezone = (timeString: string) => {
    const timezoneOffset = hourlyForecastWeatherData.city.timezone;
    const [datePart, timePart] = timeString.split(" ");
    const [year, month, day] = datePart.split("-");
    const [hours, minutes, seconds] = timePart.split(":").map(Number);
    const date = new Date(
      Date.UTC(
        Number(year),
        Number(month) - 1,
        Number(day),
        hours,
        minutes,
        seconds
      )
    );
    const adjustedTime = new Date(date.getTime() + timezoneOffset * 1000);
    return adjustedTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={style.hourlyCard}>
      {hourlyForecastWeatherData &&
        hourlyForecastWeatherData.list.map(
          (item: HourlyForecastWeatherDataType, index: number) => (
            <div className={style.parameters} key={index}>
              <p>
                {index === 0 ? "Teraz" : adjustTimeWithTimezone(item.dt_txt)}
              </p>{" "}
              <div className={style.line}></div>
              <p>
                <Image
                  className={style.image}
                  src={getWeatherIcon(item.weather[0].icon)}
                  alt="Weather Icon"
                  width={75}
                  height={75}
                  priority={true}
                />
              </p>
              <p className={style.temp}>{Math.round(item.main.temp)}°C</p>
            </div>
          )
        )}
    </div>
  );
};

export default hourlyForecast;

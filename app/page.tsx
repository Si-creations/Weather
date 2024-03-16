"use client";

import React, { useState, useEffect } from "react";
import Weather from "../components/weather/Weather";
import HourlyForecast from "../components/hourlyForecast/hourlyForecast";
import DaylyForecast from "@/components/daylyForecast/dailyForecast";

import {
  getWeatherData,
  getLocalWeather,
  getHourlyForecastData,
  getDaylyForecastData,
} from "./api/fetches/route";
import useGeolocation from "./useGeoHook";
import style from "./page.module.scss";
import { WeatherDataType } from "@/types/weatherDataType";
import { DaylyForecastWeatherDataType } from "@/types/daylyDataType";
import { HourlyForecastWeatherDataType } from "@/types/hourlyDataTypes";
import { FaSearchLocation } from "react-icons/fa";
import backgroundImg from "@/public/car.jpg";
import backgroundImg1 from "@/public/automotive.jpg";
import backgroundImg2 from "@/public/black-luts.jpg"

const Home = () => {
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherDataType | null>(null);
  const [initCity, setInitCity] = useState<string>("");
  const [hourlyForecastWeatherData, setHourlyForecastWeatherData] =
    useState<HourlyForecastWeatherDataType | null>(null);
  const [daylyForecastData, setDaylyForecastData] =
    useState<DaylyForecastWeatherDataType | null>(null);
  const [backgroundImage, setBackgroundImage] = useState("");
  const location = useGeolocation();
  const currentDate = new Date();

  const months = [
    "januára",
    "februára",
    "marca",
    "apríla",
    "mája",
    "júna",
    "júla",
    "augusta",
    "septembra",
    "októbra",
    "novembra",
    "decembra",
  ];

  const dayOfMonth = currentDate.getDate();
  const monthName = months[currentDate.getMonth()];
  const year = currentDate.getFullYear();
  const hours = ("0" + currentDate.getHours()).slice(-2);
  const minutes = ("0" + currentDate.getMinutes()).slice(-2);
  const formattedDate = `${dayOfMonth} ${monthName} ${year} | ${hours}:${minutes}`;
  const temp = weatherData?.main?.temp
    ? Math.round(weatherData.main.temp)
    : undefined;

  const wind = weatherData?.wind?.speed
    ? Math.round(weatherData.wind.speed * 3.6)
    : undefined; // convert m/s to km/h

  let lat: string | null = "";
  let lng: string | null = "";
  if (typeof window !== "undefined") {
    lat = localStorage.getItem("lat");
    lng = localStorage.getItem("lng");
  }

  const handleSearch = async () => {
    try {
      const data = await getWeatherData(city);
      setWeatherData(data);
    } catch (error) {}
    try {
      const hourlyForecastData = await getHourlyForecastData(city);
      setHourlyForecastWeatherData(hourlyForecastData);
    } catch (error) {}
  };

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const getInitData = async () => {
    try {
      const data = await getLocalWeather(lat, lng);
      setWeatherData(data);
    } catch (error) {}
  };

  const getInitForecast = async () => {
    try {
      const hourlyForecastData = await getHourlyForecastData(initCity);
      setHourlyForecastWeatherData(hourlyForecastData);
    } catch (error) {}
    try {
      const daylyForecastData = await getDaylyForecastData(initCity);
      setDaylyForecastData(daylyForecastData);
    } catch (error) {}
  };

  useEffect(() => {
    if (lat && lng) {
      getInitData();
    }
  }, [lng, lat]);

  useEffect(() => {
    if (weatherData && weatherData.name) {
      setInitCity(weatherData.name);
      const iconCode = weatherData.weather[0].icon;
      console.log(iconCode);

      if (iconCode === "01d" || iconCode === "01n") {
        setBackgroundImage(backgroundImg.src);
      } else if(iconCode === "10d" || iconCode === "10n") {
        setBackgroundImage(backgroundImg1.src)
      } else {
        setBackgroundImage(backgroundImg2.src)
      }
    }
  }, [weatherData]);

  useEffect(() => {
    if (initCity) {
      getInitForecast();
    }
  }, [initCity]);

  return (
    <div
      className={style.background}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={style.main}>
        <div className={style.frame}>
          <div className={style.leftFlex}>
            <div className={style.rowFlex}>
              <div className={style.date}>{formattedDate}</div>
              <div className={style.searchBox}>
                <button className={style.btnSearch} onClick={handleSearch}>
                  <FaSearchLocation className="fas fa-search inline" />
                </button>
                <input
                  className={style.inputSearch}
                  type="text"
                  placeholder="Zadajte mesto"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              {weatherData && <Weather weatherData={weatherData} />}
              <div className={style.lineScreen}></div>
              <div className={style.hourlyScreen}>
                <HourlyForecast
                  hourlyForecastWeatherData={
                    hourlyForecastWeatherData as HourlyForecastWeatherDataType
                  }
                />
              </div>
            </div>
            <div className={style.rightContainer}>
              <div className={style.rightBox}>
                <div className={style.topElement}>
                  <div className={style.searchBoxScreen}>
                    <input
                      className={style.inputScreen}
                      type="text"
                      placeholder="Zadajte mesto"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                    <button className={style.btnScreen} onClick={handleSearch}>
                      <FaSearchLocation className="fas fa-search inline" />
                    </button>
                  </div>
                  <div className={style.temp}>{temp}°C</div>
                  <div className={style.wind}>{wind}km/h</div>
                  <div className={style.line}></div>
                </div>

                {daylyForecastData && (
                  <DaylyForecast daylyForecastWeatherData={daylyForecastData} />
                )}
              </div>
            </div>

            {/* <div>
          {location.loaded
            ? JSON.stringify(location)
            : "Location data not available yet."}
        </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

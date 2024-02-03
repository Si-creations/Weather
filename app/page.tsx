"use client";

import React, { useState, useEffect } from "react";
import Weather from "./components/weather/Weather";
import Forecast from "./components/forecast/Forecast";
import {
  getWeatherData,
  getLocalWeather,
  getForecastData,
} from "./api/hello/route";
import useGeolocation from "../app/getGeoHook";
import style from "./page.module.scss";

const Home = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastWeatherData, setForecastWeatherData] = useState(null);
  const location = useGeolocation();
  const lat = localStorage.getItem("lat");
  const lng = localStorage.getItem("lng");

  const handleSearch = async () => {
    try {
      const data = await getWeatherData(city);
      setWeatherData(data);
    } catch (error) {}
    try {
      const forecastData = await getForecastData(city);
      setForecastWeatherData(forecastData);
    } catch (error) {}
  };

  const getInitData = async () => {
    try {
      const data = await getLocalWeather(lat, lng);
      setWeatherData(data);
    } catch (error) {}
  };

  useEffect(() => {
    if (lat && lng) {
      getInitData();
    }
  }, []);

  return (
    <div className={style.main}>
      <input
        type="text"
        placeholder="Zadajte mesto"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Hľadať</button>

      {weatherData && <Weather weatherData={weatherData} />}
      <div>
        {location.loaded
          ? JSON.stringify(location)
          : "Location data not available yet."}
      </div>
      {/* <Forecast forecastWeatherData={forecastWeatherData} /> */}
    </div>
  );
};

export default Home;

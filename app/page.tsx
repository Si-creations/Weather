"use client";

import React, { useState, useEffect } from "react";
import Weather from "../components/weather/Weather";
import Forecast from "../components/forecast/Forecast";
import {
  getWeatherData,
  getLocalWeather,
  getForecastData,
} from "./api/fetches/route";
import useGeolocation from "./useGeoHook";
import style from "./page.module.scss";

const Home = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastWeatherData, setForecastWeatherData] = useState(null);
  const location = useGeolocation();

  let lat;
  let lng;
  if (typeof window !== "undefined") {
    lat = localStorage.getItem("lat");
    lng = localStorage.getItem("lng");
  }

  console.log(weatherData);
  console.log(lat);

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
  }, [lng, lat]);

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
      <Forecast forecastWeatherData={forecastWeatherData} />
    </div>
  );
};

export default Home;

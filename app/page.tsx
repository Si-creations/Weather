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

const Home = () => {
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherDataType | null>(null);
  const [initCity, setInitCity] = useState<string>("");
  const [hourlyForecastWeatherData, setHourlyForecastWeatherData] =
    useState<HourlyForecastWeatherDataType | null>(null);
  const [daylyForecastData, setDaylyForecastData] =
    useState<DaylyForecastWeatherDataType | null>(null);
  const location = useGeolocation();

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
      // Spustenie funkcie pri stlačení klávesy Enter
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
    }
  }, [weatherData]);

  useEffect(() => {
    if (initCity) {
      getInitForecast();
    }
  }, [initCity]);

  return (
    <div className={style.main}>
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
      {/* <div>
        {location.loaded
          ? JSON.stringify(location)
          : "Location data not available yet."}
      </div> */}
      <HourlyForecast
        hourlyForecastWeatherData={
          hourlyForecastWeatherData as HourlyForecastWeatherDataType
        }
      />
      <DaylyForecast
        daylyForecastWeatherData={
          daylyForecastData as DaylyForecastWeatherDataType
        }
      />
    </div>
  );
};

export default Home;

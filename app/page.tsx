"use client";

import React, { useState, useEffect } from "react";
import Weather from "./components/Weather";
import Time from "./components/time/Time";
import { getWeatherData, getLocalWeather } from "./api/hello/route";
import useGeolocation from "../app/getGeoHook";

const Home = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const location = useGeolocation();
  const lat = localStorage.getItem("lat");
  const lng = localStorage.getItem("lng");

  const handleSearch = async () => {
    try {
      const data = await getWeatherData(city);
      setWeatherData(data);
    } catch (error) {}
  };

  useEffect(() => {
    if (lat && lng) {
      getInitData();
    }
  }, []);

  const getInitData = async () => {
    try {
      const data = await getLocalWeather(lat, lng);
      setWeatherData(data);
    } catch (error) {}
  };

  return (
    <div>
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
      <Time timeData={undefined} />
    </div>
  );
};

export default Home;

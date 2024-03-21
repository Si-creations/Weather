"use client";

import React, { useState, useEffect } from "react";
import useGeolocation from "./useGeoHook";
//Components
import Weather from "../components/weather/Weather";
import HourlyForecast from "../components/hourlyForecast/hourlyForecast";
import DaylyForecast from "@/components/daylyForecast/dailyForecast";
import LoadingScreen from "@/components/loadingScreen/loadingScreen";
//API fetches
import {
  getWeatherData,
  getLocalWeather,
  getHourlyForecastData,
  getDaylyForecastData,
} from "./api/fetches/route";
//Styles
import style from "./page.module.scss";
//Types
import { WeatherDataType } from "@/types/weatherDataType";
import { DaylyForecastWeatherDataType } from "@/types/daylyDataType";
import { HourlyForecastWeatherDataType } from "@/types/hourlyDataTypes";
import { FaSearchLocation } from "react-icons/fa";
//Background images
import clearSky from "@/public/clear_sky.jpg";
import clearN from "@/public/clearN.jpg";
import fewClouds from "@/public/fewClouds.jpg";
import fewCloudsN from "@/public/fewCloudsN.jpg";
import scatteredClouds from "@/public/scatteredClouds.jpg";
import scatteredN from "@/public/scatteredN.jpg";
import clouds from "@/public/clouds.jpg";
import cloudsN from "@/public/cloudsN.jpg";
import showerRain from "@/public/showerRain.jpg";
import showerRainN from "@/public/showerRainN.jpg";
import rain from "@/public/rain.jpg";
import rainN from "@/public/rainN.jpg";
import thunder from "@/public/thunder.jpg";
import thunderN from "@/public/thunderN.jpg";
import snow from "@/public/snow.jpg";
import snowN from "@/public/snowN.jpg";
import mist from "@/public/mist.jpg";
import mistN from "@/public/mistN.jpg";

const Home = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
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
    try {
      const daylyForecastData = await getDaylyForecastData(city);
      setDaylyForecastData(daylyForecastData);
    } catch (error) {}

    setCity("")
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

    const iconCode = weatherData?.weather[0].icon;
    console.log(iconCode);

    switch (iconCode) {
      case "01d":
        setBackgroundImage(clearSky.src);
        break;
      case "01n":
        setBackgroundImage(clearN.src);
        break;
      case "02d":
        setBackgroundImage(fewClouds.src);
        break;
      case "02n":
        setBackgroundImage(fewCloudsN.src);
        break;
      case "03d":
        setBackgroundImage(scatteredClouds.src);
        break;
      case "03n":
        setBackgroundImage(scatteredN.src);
        break;
      case "04d":
        setBackgroundImage(clouds.src);
        break;
      case "04n":
        setBackgroundImage(cloudsN.src);
        break;
      case "9d":
        setBackgroundImage(rain.src);
        break;
      case "9n":
        setBackgroundImage(rainN.src);
        break;
      case "10d":
        setBackgroundImage(showerRain.src);
        break;
      case "10n":
        setBackgroundImage(showerRainN.src);
        break;
      case "11d":
        setBackgroundImage(thunder.src);
        break;
      case "11n":
        setBackgroundImage(thunderN.src);
        break;
      case "13d":
        setBackgroundImage(snow.src);
        break;
      case "13n":
        setBackgroundImage(snowN.src);
        break;
      case "50d":
        setBackgroundImage(mist.src);
        break;
      case "50n":
        setBackgroundImage(mistN.src);
        break;
      default:
        setBackgroundImage(clearSky.src);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (lat && lng) {
      getInitData();
    } else {
      setCity("London");
    }
  }, [lng, lat]);

  useEffect(() => {
    if (city  && initialLoad) {
      handleSearch();
      setInitialLoad(false)
    }
  }, [city]);

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
    <div
      className={style.background}
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {isLoading ? (
        <LoadingScreen />
      ) : (
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
                      <button
                        className={style.btnScreen}
                        onClick={handleSearch}
                      >
                        <FaSearchLocation className="fas fa-search inline" />
                      </button>
                    </div>
                    <div className={style.temp}>{temp}°C</div>
                    <div className={style.wind}>{wind}km/h</div>
                    <div className={style.line}></div>
                  </div>

                  {daylyForecastData && (
                    <DaylyForecast
                      daylyForecastWeatherData={daylyForecastData}
                    />
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
      )}
    </div>
  );
};

export default Home;

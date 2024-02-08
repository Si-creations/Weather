"use client";

import React, { useState, useEffect } from "react";

const Forecast = ({ forecastWeatherData }) => {
  console.log(forecastWeatherData);
  const [currentDate, setCurrentDate] = useState("");

  // const dateFromApi = new Date(apiDateTime);
  // const currentDay = dateFromApi.toLocaleDateString("sk-SK", {
  //   weekday: "long",
  // });

  useEffect(() => {
    if (forecastWeatherData && forecastWeatherData.list[1].dt_txt) {
      setCurrentDate(forecastWeatherData.list[1].dt_txt);
    }
  });

  console.log(currentDate); // Vypíše 2024-02-08 21:00:00

  return (
    <div className="flex gap-4 justify-between">
      {forecastWeatherData &&
        forecastWeatherData.list.map((item, index) => (
          <div className="hourly-card flex flex-col items-center" key={index}>
            <div className="bg-red-200 my-4">
              <p>
                {index === 0 ? "teraz" : item.dt_txt.split(" ")[1].slice(0, 5)}
              </p>{" "}
              <p>{Math.round(item.main.temp)}°</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Forecast;

"use client";

import React, { useState, useEffect } from "react";

const hourlyForecast = ({ hourlyForecastWeatherData }) => {
  // console.log(hourlyForecastWeatherData);


  return (
    <div className="flex gap-4 justify-between">
      {hourlyForecastWeatherData &&
        hourlyForecastWeatherData.list.map((item, index) => (
          <div className="hourly-card flex flex-col items-center" key={index}>
            <div className="my-4">
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

export default hourlyForecast;

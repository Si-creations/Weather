"use client";

import React, { useState, useEffect } from "react";

const daylyForecast = ({ daylyForecastWeatherData }) => {
  console.log(daylyForecastWeatherData);

  return (
    <div className="bg-red-400 mb-48">
      <p>Denna predpoved:</p>
      {daylyForecastWeatherData &&
        daylyForecastWeatherData.forecast.forecastday.map((item, index) => (
          <div key={index}>
            <p>{Math.round(item.day.maxtemp_c)} / {Math.round(item.day.mintemp_c)}</p>
            <p>{item.day.condition.text}</p>
            <p>{Math.round(item.day.maxtemp_c)} / {Math.round(item.day.mintemp_c)}</p>
            <p>{item.day.condition.text}</p>
          </div>
        ))}
    </div>
  );
};

export default daylyForecast;

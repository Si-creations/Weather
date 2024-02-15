"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const DaylyForecast = ({ daylyForecastWeatherData }) => {
  console.log(daylyForecastWeatherData);

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={handleToggle}>Predpoved na 5 dni tu</button>
      <motion.div
        className="window overflow-x-hidden"
        initial={{ opacity: 1, x: '100vw' }}
        animate={{ opacity: 1, x: isOpen ? 0 : "100vw" }}
        transition={{ duration: 0.5 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p>Denna predpoved:</p>
        {daylyForecastWeatherData &&
          daylyForecastWeatherData.forecast.forecastday.map((item, index) => (
            <div key={index}>
              <p>
                {Math.round(item.day.maxtemp_c)} /{" "}
                {Math.round(item.day.mintemp_c)}
              </p>
              <p>{item.day.condition.text}</p>
              <p>
                {Math.round(item.day.maxtemp_c)} /{" "}
                {Math.round(item.day.mintemp_c)}
              </p>
              <p>{item.day.condition.text}</p>
            </div>
          ))}
        <button onClick={handleToggle}>Zavriet predpoved</button>
      </motion.div>
    </div>
  );
};

export default DaylyForecast;

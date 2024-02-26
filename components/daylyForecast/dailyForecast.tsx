"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import style from "./dailyForecast.module.scss";
import Image from "next/image";
import { DaylyForecastDataPropsType } from "@/types/weatherDataType";
import { DaylyForecastWeatherDataType } from "@/types/daylyDataType";

const DaylyForecast = ({
  daylyForecastWeatherData,
}: DaylyForecastDataPropsType) => {
  console.log(daylyForecastWeatherData);

  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  function getDayOfWeek(dateString: string) {
    const days = [
      "Nedeľa",
      "Pondelok",
      "Utorok",
      "Streda",
      "Štvrtok",
      "Piatok",
      "Sobota",
    ];
    const date = new Date(dateString);
    const dayOfWeek = date.getDay();
    return days[dayOfWeek];
  }

  return (
    <div>
      <button onClick={handleToggle}>Predpoved na 5 dni tu</button>
      <motion.div
        className={style.main}
        initial={{ opacity: 0, x: "100vw" }}
        animate={{ opacity: 1, x: isOpen ? 0 : "100vw" }}
        transition={{ duration: 0.5 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p>Denna predpoved:</p>
        {daylyForecastWeatherData &&
          daylyForecastWeatherData.forecast.forecastday.map(
            (item: DaylyForecastWeatherDataType, index: number) => (
              <div key={index} className="w-full px-4">
                <div className="flex justify-between gap-4 bg-red-400 ">
                  <p>{getDayOfWeek(item.date)}</p>
                  <div className="flex items-center">
                    <Image
                      src={`https:${item.day.condition.icon}`}
                      alt="Weather Icon"
                      width={50}
                      height={50}
                      priority={true}
                    />
                    <p>{item.day.condition.text}</p>
                  </div>
                  <p>
                    {Math.round(item.day.maxtemp_c)} /{" "}
                    {Math.round(item.day.mintemp_c)}
                  </p>
                </div>
              </div>
            )
          )}
        {daylyForecastWeatherData &&
          daylyForecastWeatherData.forecast.forecastday.map(
            (item: DaylyForecastWeatherDataType, index: number) => (
              <div key={index} className="w-full px-4">
                <div className="flex justify-between gap-4 bg-red-400 ">
                  <p>{getDayOfWeek(item.date)}</p>
                  <div className="flex items-center">
                    <Image
                      src={`https:${item.day.condition.icon}`}
                      alt="Weather Icon"
                      width={50}
                      height={50}
                      priority={true}
                    />
                    <p>{item.day.condition.text}</p>
                  </div>
                  <p>
                    {Math.round(item.day.maxtemp_c)} /{" "}
                    {Math.round(item.day.mintemp_c)}
                  </p>
                </div>
              </div>
            )
          )}
        <button onClick={handleToggle}>Zavriet predpoved</button>
      </motion.div>
    </div>
  );
};

export default DaylyForecast;

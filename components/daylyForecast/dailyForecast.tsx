"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import style from "./dailyForecast.module.scss";
import Image from "next/image";
import { DaylyForecastDataPropsType } from "@/types/weatherDataType";
import { DaylyForecastWeatherDataType } from "@/types/daylyDataType";
import { FaArrowLeft } from "react-icons/fa6";

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
      <motion.button
        onClick={handleToggle}
        className={style.button}
        whileTap={{ scale: 0.9 }}
      >
        Predpoved na 5 dni
      </motion.button>
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
        <div className={style.closeBtn}>
          <FaArrowLeft />
          <button onClick={handleToggle}>Naspäť</button>
        </div>
        <p className={style.title}>Denná predpoveď</p>
        {daylyForecastWeatherData &&
          daylyForecastWeatherData.forecast.forecastday.map(
            (item: DaylyForecastWeatherDataType, index: number) => (
              <div key={index} className={style.mainContainer}>
                <div className={style.weatherContainer}>
                  <p>{getDayOfWeek(item.date)}</p>
                  <div className={style.imgContainer}>
                    <Image
                      src={`https:${item.day.condition.icon}`}
                      alt="Weather Icon"
                      width={70}
                      height={70}
                      priority={true}
                    />
                    <p>{item.day.condition.text}</p>
                  </div>
                  <p className={style.temp}>
                    {Math.round(item.day.maxtemp_c)}°/{" "}
                    {Math.round(item.day.mintemp_c)}°
                  </p>
                </div>
                <div className={style.line}></div>
              </div>
            )
          )}
        {daylyForecastWeatherData &&
          daylyForecastWeatherData.forecast.forecastday.map(
            (item: DaylyForecastWeatherDataType, index: number) => (
              <div key={index} className={style.mainContainer}>
                <div className={style.weatherContainer}>
                  <p>{getDayOfWeek(item.date)}</p>
                  <div className={style.imgContainer}>
                    <Image
                      src={`https:${item.day.condition.icon}`}
                      alt="Weather Icon"
                      width={70}
                      height={70}
                      priority={true}
                    />
                    <p>{item.day.condition.text}</p>
                  </div>
                  <p className={style.temp}>
                    {Math.round(item.day.maxtemp_c)}°/{" "}
                    {Math.round(item.day.mintemp_c)}°
                  </p>
                </div>
                {index !==
                  daylyForecastWeatherData.forecast.forecastday.length - 1 && (
                  <div className={style.line}></div>
                )}
              </div>
            )
          )}
      </motion.div>
    </div>
  );
};

export default DaylyForecast;

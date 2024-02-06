import React from "react";

const Forecast = ({ forecastWeatherData }) => {
  // const temp = Math.round(forecastWeatherData.list[0].main.temp);
  console.log(forecastWeatherData)

  return (
    <div className="">
      {/* {forecastWeatherData && forecastWeatherData.map((data, index) => (
        <p key={index}> Tepolota: {data.list.main.temp}</p>
      ))} */}
    </div>
  );
};

export default Forecast;

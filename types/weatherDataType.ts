import { DaylyForecastWeatherDataType } from "./daylyDataType";

export type WeatherDataType = {
  timezone: number;
  name: string;
  main: {
    temp: number;
    humidity: number;
    pressure: number;
    feels_like: number;
  };
  wind: {
    speed: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
  weather: [WeatherType];
};

export type WeatherType = {
  icon: string;
  description: string;
};

export type WeatherDataPropsType = {
  weatherData: WeatherDataType;
};

export type DaylyForecastDataPropsType = {
  daylyForecastWeatherData: DaylyForecastWeatherDataType;
};

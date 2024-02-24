import { DaylyForecastWeatherDataType } from "./daylyDataType";

export type WeatherDataType = {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: [WeatherType];
};

export type WeatherType = {
  icon: string;
  description: string;
};

export type WeatherDataPropsType = {
  weatherData: WeatherDataType;
  daylyForecastWeatherData: DaylyForecastWeatherDataType
};

export type DaylyForecastDataPropsType = {
  daylyForecastWeatherData: DaylyForecastWeatherDataType;
};

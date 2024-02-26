export type HourlyForecastWeatherDataType = {
  weather: { icon: string }[];

  dt_txt: string;

  main: {
    temp: number;
  };

  list: {
    map: Function;
  };
};

export type HourlyForecastWeatherDataPropsType = {
  hourlyForecastWeatherData: HourlyForecastWeatherDataType;
};

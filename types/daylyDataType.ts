export type DaylyForecastWeatherDataType = {
  forecast: {
    forecastday: {
      map: Function;
    };
  };
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    condition: {
      text: string;
    };
  };
};

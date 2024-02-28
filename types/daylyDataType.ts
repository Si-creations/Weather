export type DaylyForecastWeatherDataType = {
  forecast: {
    forecastday: {
      map: Function;
      length: number;
    };
  };
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
  date: string;
};

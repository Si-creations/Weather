export type weatherDataType = {
  weatherData: {
    name: string;
    main: {
      temp: number;
      
      humidity: number;
    };
    wind: {
      speed: number
    }
    weather: [weatherType]
  };
};

export type weatherType = {
    icon: string;
    description: string;
}


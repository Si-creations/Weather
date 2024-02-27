import axios from "axios";

const APIkey = process.env.NEXT_PUBLIC_API_KEY;
const APIkey2 = process.env.NEXT_PUBLIC_FORECAST_API_KEY;

export const getWeatherData = async (city) => {
  // console.log(APIkey);
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric&lang=sk`
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Chyba pri získavaní údajov o počasí", error);
    throw error;
  }
};

export const getLocalWeather = async (lat, lng) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${APIkey}&units=metric&lang=sk`
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Chyba pri získavaní údajov o počasí(location)", error);
    throw error;
  }
};

export const getHourlyForecastData = async (city) => {
  // console.log(APIkey);
  // console.log(city);
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=9&appid=${APIkey}&units=metric&lang=sk`
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Chyba pri získavaní údajov o počasí (hourly)", error);
    throw error;
  }
};



export const getDaylyForecastData = async (city) => {
  // console.log(city);
  // console.log(APIkey);
  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/forecast.json?key=${APIkey2}&q=${city}&aqi=no&days=3&lang=sk`
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Chyba pri získavaní údajov o počasí (daily)", error);
    throw error;
  }
};



import axios from "axios";

const APIkey = process.env.NEXT_PUBLIC_API_KEY;

export const getWeatherData = async (city) => {
  console.log(APIkey);
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric&lang=sk`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Chyba pri získavaní údajov o počasí", error);
    throw error;
  }
};

export const getLocalWeather = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric&lang=sk`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Chyba pri získavaní údajov o počasí(location)", error);
    throw error;
  }
};

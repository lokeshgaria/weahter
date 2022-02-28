import axios from "axios";

const URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "6276b07c735aba3aeed00e299b12b044";

 

export const fetchWeather = async (query) => {
  const { data } = await axios.get(URL, {
    params: {
      q: query,
      units: "metric",
      APPID: API_KEY,
    },
  });

  return data;
};

export const fetchWithcoordinates = async (lat, long) => {
  const { data } = await axios.get(
    `${URL}?lat=${lat}&lon=${long}&units=metric&appid=${API_KEY}`
  );

  return data;
};

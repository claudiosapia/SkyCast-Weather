import axios from "axios"; // retrive data <---- http request

// api.openweathermap.org / data / 2.5 / weather ? q = { city name } & appid={ API key }
// https://api.openweathermap.org/data/2.5/weather?q=Denmark&appid=1ab3e8ddd070fc9458c66e71b0a3b222&units=metric

const URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "ad1be1e92aa1f903daaa5bdf2bcf9b0f";

export const fetchData = async (val) => {
  const { data } = await axios.get(URL, {
    params: {
      q: val,
      units: "metric",
      APPID: API_KEY,
    },
  });
  return data;
};

export default fetchData;

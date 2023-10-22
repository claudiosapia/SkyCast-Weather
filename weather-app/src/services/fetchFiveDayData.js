import axios from "axios";

export async function fetchFiveDayData(city) {
  const API_KEY = "ad1be1e92aa1f903daaa5bdf2bcf9b0f";
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching forecast:", error);
    throw error;
  }
}

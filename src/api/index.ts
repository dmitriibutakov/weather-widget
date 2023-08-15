import { ApiWeatherData, WeatherApiModule } from "@/api/types";
import axios from "axios";

const weatherApi: WeatherApiModule = {
  getResponseFromApi: (latitude, longitude, key) =>
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`
      )
      .then((response) => response.data as ApiWeatherData)
      .catch((error) => {
        throw new Error(`Ошибка при запросе погоды: ${error}`);
      }),
};
export { weatherApi };

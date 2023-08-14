import { WeatherData } from "@/types";
import axios from "axios";

interface WeatherApiModule {
  getResponseFromApi: (
    latitude: number,
    longitude: number,
    key: string
  ) => Promise<WeatherData>;
}

const weatherApi: WeatherApiModule = {
  getResponseFromApi: (latitude, longitude, key) =>
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`
      )
      .then((response) => response.data as WeatherData)
      .catch((error) => {
        throw new Error(`Ошибка при запросе погоды: ${error}`);
      }),
};
export { weatherApi };

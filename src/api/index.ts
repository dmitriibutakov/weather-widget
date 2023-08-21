import axios from "axios";
import { ApiWeatherData, WeatherApiModule } from "@/api/types/weatherApi";
import { ApiNinjaCityData, NinjaApiModule } from "@/api/types/ninjaApi";

const weatherApi: WeatherApiModule = {
  getWeather: (latitude, longitude) =>
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.VUE_APP_WEATHER_API_KEY}&units=metric`
      )
      .then((response) => response.data as ApiWeatherData)
      .catch((error) => {
        throw new Error(`Api weather error: ${error}`);
      }),
};
const ninjaApi: NinjaApiModule = {
  getCity: (value) =>
    axios
      .get(`https://api.api-ninjas.com/v1/city?name=${value}`, {
        headers: {
          "X-Api-Key": process.env.VUE_APP_NINJA_API_KEY,
        },
      })
      .then((response) => response.data as ApiNinjaCityData)
      .catch((error) => {
        throw new Error(`Api city error: ${error}`);
      }),
};
export { weatherApi, ninjaApi };

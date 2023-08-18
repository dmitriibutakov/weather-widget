import { defineStore } from "pinia";
import { WeatherCondition, WeatherData } from "@/types";
import { weatherApi } from "@/api";
import { useCommonStore } from "@/store/common";

interface WeatherState {
  weatherCollection: WeatherData[];
}

export const useWeatherStore = defineStore({
  id: "classificator",
  state: (): WeatherState => ({
    weatherCollection: [
      {
        longitude: 0,
        latitude: 0,
        position: {
          city: "",
          country: "",
        },
        weatherIcons: [],
        cloudiness: 0,
        visibility: 0,
        main: {
          feels_like: 0,
          humidity: 0,
          pressure: 0,
          temp: 0,
        },
        wind: {
          speed: 0,
          deg: 0,
        },
      },
    ],
  }),
  getters: {
    getWeather: (state: WeatherState): WeatherData[] => state.weatherCollection,
  },
  actions: {
    // eslint-disable-next-line no-undef
    setLocalPosition(position: GeolocationPosition) {
      this.weatherCollection[0].longitude = position.coords.longitude;
      this.weatherCollection[0].latitude = position.coords.latitude;
    },

    async fetchWeatherData() {
      try {
        useCommonStore().setIsLoading(true);
        this.weatherCollection = JSON.parse(
          localStorage.getItem("weather") ??
            JSON.stringify(this.weatherCollection)
        );

        for (const value of this.weatherCollection) {
          if (value.longitude === 0) {
            // Set local position
            try {
              const position = await new Promise<GeolocationPosition>(
                (resolve, reject) => {
                  navigator.geolocation.getCurrentPosition(resolve, reject);
                }
              );
              this.setLocalPosition(position);
            } catch (error) {
              useCommonStore().setError(
                "Location declined, restore browser and give accept to your location"
              );
            }
          }

          const { name, sys, clouds, visibility, weather, main, wind } =
            await weatherApi.getResponse(
              value.latitude,
              value.longitude,
              process.env.VUE_APP_API_URL
            );

          value.position.city = name;
          value.position.country = sys.country;
          value.weatherIcons = weather;
          value.main = main;
          value.wind = wind;
          value.cloudiness = clouds.all;
          value.visibility = visibility;
          value.weatherIcons.forEach((el) => {
            el.icon = `https://openweathermap.org/img/wn/${el.icon}@2x.png`;
          });

          for (const key in value.main) {
            const mainKey = key as keyof WeatherCondition;
            value.main[mainKey] = Math.round(value.main[mainKey]);
          }

          console.log(value);
        }

        localStorage.setItem("weather", JSON.stringify(this.weatherCollection));
      } catch (e: any) {
        throw new Error(e);
      } finally {
        useCommonStore().setIsLoading(false);
      }
    },
  },
});

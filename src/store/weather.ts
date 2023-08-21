import { defineStore } from "pinia";
import { WeatherCondition, WeatherData } from "@/types";
import { useCommonStore } from "@/store/common";
import { ninjaApi, weatherApi } from "@/api";

type Over = {
  item: WeatherData;
  pos: number;
  dir: "up" | "down";
};

interface WeatherState {
  weatherCollection: WeatherData[];
  over: Over;
  startLoc: number;
  dragging: boolean;
  dragFrom: WeatherData;
}

const cityInitial = {
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
} as WeatherData;
export const useWeatherStore = defineStore({
  id: "weather",
  state: (): WeatherState => ({
    weatherCollection: [cityInitial],
    over: {
      item: cityInitial,
      pos: 0,
      dir: "down",
    },
    startLoc: 0,
    dragging: false,
    dragFrom: cityInitial,
  }),
  getters: {
    getWeather: (state: WeatherState): WeatherData[] => state.weatherCollection,
    getOver: (state: WeatherState): Over => state.over,
    getStartLoc: (state: WeatherState): number => state.startLoc,
    getDragging: (state: WeatherState): boolean => state.dragging,
    getDragFrom: (state: WeatherState): WeatherData => state.dragFrom,
  },
  actions: {
    // eslint-disable-next-line no-undef
    setLocalPosition(position: GeolocationPosition) {
      this.weatherCollection[0].longitude = position.coords.longitude;
      this.weatherCollection[0].latitude = position.coords.latitude;
    },
    //fetch weather data
    async fetchWeatherData() {
      try {
        useCommonStore().setIsLoading(true);
        this.weatherCollection = JSON.parse(
          localStorage.getItem("weather") ??
            JSON.stringify(this.weatherCollection)
        );
        for (const value of this.weatherCollection) {
          if (!value.position.city) {
            // Set local position
            const position = await new Promise<GeolocationPosition>(
              (resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
              }
            );
            if (position) {
              this.setLocalPosition(position);
            }
          }
          const { name, sys, clouds, visibility, weather, main, wind } =
            await weatherApi.getWeather(value.latitude, value.longitude);
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
        }
        // eslint-disable-next-line
            } catch (e: any) {
        useCommonStore().setError(e.message);
      } finally {
        useCommonStore().setIsLoading(false);
      }
    },
    //change order cities
    startDrag(item: WeatherData, i: number, e: MouseEvent) {
      this.startLoc = e.clientY;
      this.dragging = true;
      this.dragFrom = item;
    },
    onDragOver(item: WeatherData, pos: number, e: MouseEvent) {
      const dir = this.startLoc < e.clientY ? "down" : "up";
      this.over = { item, pos, dir };
    },
    finishDrag(item: WeatherData, pos: number) {
      this.weatherCollection.splice(pos, 1);
      this.weatherCollection.splice(this.over.pos, 0, item);
      this.over = { item: cityInitial, pos: 0, dir: "down" };
      this.setWeatherToLocalStorage();
    },
    //set weather array lo localStorage
    setWeatherToLocalStorage() {
      this.weatherCollection = this.weatherCollection.filter(
        (el) => el.position.city
      );
      localStorage.setItem("weather", JSON.stringify(this.weatherCollection));
    },
    async addCity(value: string) {
      try {
        useCommonStore().setIsLoading(true);
        const response = await ninjaApi.getCity(value);
        if (response.length !== 0) {
          //record first search item longitude and latitude
          const newCity = {
            ...cityInitial,
            latitude: response[0].latitude,
            longitude: response[0].longitude,
            position: {
              city: response[0].name,
              country: response[0].country,
            },
          };

          // Check if the city already exists in weatherCollection
          const cityAlreadyExists = this.weatherCollection.some(
            (city) => city.position.city === response[0].name
          );
          if (cityAlreadyExists) {
            // Handle the error case
            console.log("already");
            useCommonStore().setError("This city already exists.");
          } else {
            // Add the new city if it doesn't already exist
            this.weatherCollection.push(newCity);
          }
          //set weather to localStorage
          this.setWeatherToLocalStorage();
          await this.fetchWeatherData();
        } else {
          useCommonStore().setError("City not found.");
        }
        // eslint-disable-next-line
            } catch (e: any) {
        useCommonStore().setError(e.message);
      } finally {
        useCommonStore().setIsLoading(false);
      }
    },
    async deleteCity(id: number) {
      this.weatherCollection = this.weatherCollection.filter(
        (el, idx) => idx !== id
      );
      this.setWeatherToLocalStorage();
      await this.fetchWeatherData();
    },
  },
});

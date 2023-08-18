import { defineStore } from "pinia";
import { WeatherCondition, WeatherData } from "@/types";
import { weatherApi } from "@/api";
import { useCommonStore } from "@/store/common";

interface Over {
  item: any;
  pos: any;
  dir: any;
}

interface WeatherState {
  weatherCollection: WeatherData[];
  over: Over;
  startLoc: number;
  dragging: boolean;
  dragFrom: any;
}

export const useWeatherStore = defineStore({
  id: "weather",
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
    over: {
      item: "",
      pos: "",
      dir: "",
    },
    startLoc: 0,
    dragging: false,
    dragFrom: {},
  }),
  getters: {
    getWeather: (state: WeatherState): WeatherData[] => state.weatherCollection,
    getOver: (state: WeatherState): Over => state.over,
    getStartLoc: (state: WeatherState): number => state.startLoc,
    getDragging: (state: WeatherState): boolean => state.dragging,
    getDragFrom: (state: WeatherState): any => state.dragFrom,
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
        useCommonStore().setError("");
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
                "Your location has been rejected. Allow location in browser"
              );
            }
          }
          if (!useCommonStore().getError) {
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
          }
        }
        !useCommonStore().getError &&
          localStorage.setItem(
            "weather",
            JSON.stringify(this.weatherCollection)
          );
      } catch (e: any) {
        throw new Error(e);
      } finally {
        useCommonStore().setIsLoading(false);
      }
    },
    //changeOrder
    startDrag(item: any, i: any, e: any) {
      this.startLoc = e.clientY;
      this.dragging = true;
      this.dragFrom = item;
      console.log(item, "item");
    },

    finishDrag(item: any, pos: any) {
      this.weatherCollection.splice(pos, 1);
      this.weatherCollection.splice(this.over.pos, 0, item);
      this.over = { item: "", pos: "", dir: "" };
    },

    onDragOver(item: any, pos: any, e: any) {
      const dir = this.startLoc < e.clientY ? "down" : "up";
      this.over = { item, pos, dir };
    },
    searchCity(value: string) {
      console.log(`search ${value}`);
    },
  },
});

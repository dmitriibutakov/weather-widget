<template>
  <div class="widget">
    <div
      v-for="(val, idx) in weatherRef.weather"
      :key="idx"
      class="widget__weather weather"
    >
      <div class="weather__country">
        {{ weatherRef.position }} <SettingsIcon />
      </div>
      <!-- {{ weatherRef.main }} -->
      <div class="weather__condition">
        <img :src="val.icon" alt="weather" s />
        {{ weatherRef.main.temp }}°C
      </div>
      Feels like {{ weatherRef.main.feels_like }}°C, {{ val.description }}
      <div class="weather__addition">
        <p v-for="(val, idx) in weatherAddition()" :key="idx">
          <span v-if="val.name == 'Wind'"
            ><WindIcon :deg="weatherRef.wind.deg"
          /></span>
          <span v-else-if="val.name == 'Pressure'"><PressureIcon /></span>
          <span v-else-if="val.name == 'Humidity'">Humidity:</span>
          <span v-else-if="val.name == 'Cloudiness'"><CloudinessIcon /></span>
          <span v-else-if="val.name == 'Visibility'">Visibility:</span>
          {{ val.value }}
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { weatherApi } from "@/api";
import { defineComponent, ref } from "vue";
import {
  PositionRef,
  WeatherRef,
  WidgetRef,
  MainWeatherRef,
} from "./types/WeatherWidget";

import PressureIcon from "@/components/Icons/PressureIcon.vue";
import WindIcon from "@/components/Icons/WindIcon.vue";
import CloudinessIcon from "@/components/Icons/CloudinessIcon.vue";
import SettingsIcon from "@/components/Icons/SettingsIcon.vue";

export default defineComponent({
  name: "WeatherWidget",
  components: { PressureIcon, WindIcon, CloudinessIcon, SettingsIcon },
  setup() {
    //стейт
    const widgetRef = ref<WidgetRef>({
      isShowSettings: false,
    });
    const positionRef = ref<PositionRef>({
      longitude: 0,
      latitude: 0,
    });
    const weatherRef = ref<WeatherRef>({
      position: "",
      weather: [],
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
    });
    // проверяем local storage
    if (
      !localStorage.getItem("latitude") ||
      !localStorage.getItem("longitude")
    ) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setLocalPosition);
      } else {
        throw new Error("Access to geolocation denied");
      }
    } else {
      positionRef.value.latitude = Number(localStorage.getItem("latitude"));
      positionRef.value.longitude = Number(localStorage.getItem("longitude"));
    }
    //записываем координаты
    // eslint-disable-next-line no-undef
    async function setLocalPosition(position: GeolocationPosition) {
      localStorage.setItem("latitude", `${position.coords.latitude}`);
      localStorage.setItem("longitude", `${position.coords.longitude}`);
    }
    //получаем данные с api
    async function setDataFromApi() {
      try {
        if (positionRef.value.latitude && positionRef.value.longitude) {
          const res = await weatherApi.getResponseFromApi(
            positionRef.value.latitude,
            positionRef.value.longitude,
            process.env.VUE_APP_API_URL
          );
          console.log(res);
          const { name, sys, clouds, visibility, weather, main, wind } =
            await weatherApi.getResponseFromApi(
              positionRef.value.latitude,
              positionRef.value.longitude,
              process.env.VUE_APP_API_URL
            );
          weatherRef.value.position = `${name}, ${sys.country}`;
          weatherRef.value.weather = weather;
          weatherRef.value.main = main;
          weatherRef.value.wind = wind;
          weatherRef.value.cloudiness = clouds.all;
          weatherRef.value.visibility = visibility;
          //получаем иконки
          weather.forEach((el) => {
            el.icon = `https://openweathermap.org/img/wn/${el.icon}@2x.png`;
          });
          //округляем значения погоды
          for (let key in weatherRef.value.main) {
            const mainKey = key as keyof MainWeatherRef;
            weatherRef.value.main[mainKey] = Math.round(
              weatherRef.value.main[mainKey]
            );
          }
        }
      } catch (e: any) {
        throw new Error(e);
      }
    }
    //????
    function weatherAddition() {
      return [
        { name: "Wind", value: `${weatherRef.value.wind.speed}m/s` },
        { name: "Pressure", value: `${weatherRef.value.main.pressure}hPa` },
        { name: "Humidity", value: `${weatherRef.value.main.humidity}%` },
        { name: "Cloudiness", value: `${weatherRef.value.cloudiness}%` },
        {
          name: "Visibility",
          value: `${(weatherRef.value.visibility / 1000).toFixed(1) + "km"}`,
        },
      ];
    }
    setDataFromApi();
    return {
      weatherRef,
      widgetRef,
      weatherAddition,
    };
  },
});
</script>

<style scoped lang="scss">
.widget {
  font-family: "Open sans", sans-serif;
  padding: 8px 16px;
  background-color: #fff;
  color: #0f0f0f;
  max-width: 245px;
  min-height: 245px;
  .weather {
    display: flex;
    flex-direction: column;
    &__country {
      font-size: 12px;
      font-weight: 600;
      display: flex;
      justify-content: flex-start;
    }
    &__condition {
      display: flex;
      align-items: center;
      font-size: 48px;
      font-weight: 300;
      img {
        width: 100px;
        height: 100px;
      }
    }
    &__addition {
      margin: 8px 0 0 0;
      display: flex;
      flex-wrap: wrap;
      & > p {
        font-size: 14px;
        padding: 4px;
        min-height: 35px;
        flex: 0 0 50%;
        display: flex;
        align-items: center;
        & > span {
          margin-right: 4px;
        }
      }
    }
  }
}
</style>

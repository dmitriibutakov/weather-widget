<template>
  <div class="weather-widget">
    {{ weatherData.position }}
    <img :src="weatherData.iconUrl" alt="icon" />
    feels like: {{ weatherData.main.feels_like }} <br />
    humidity: {{ weatherData.main.humidity }} <br />
    pressure: {{ weatherData.main.pressure }} <br />
    temp: {{ weatherData.main.temp }} <br />
    wind: {{ weatherData.wind.speed }} {{ weatherData.wind.deg }}
  </div>
</template>

<script lang="ts">
import { weatherApi } from "@/api";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "WeatherWidget",
  setup() {
    //стейт
    const positionData = ref({
      longitude: 0,
      latitude: 0,
    });
    const weatherData = ref({
      position: "",
      iconUrl: "",
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
      positionData.value.latitude = Number(localStorage.getItem("latitude"));
      positionData.value.longitude = Number(localStorage.getItem("longitude"));
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
        if (positionData.value.latitude && positionData.value.longitude) {
          const res = await weatherApi.getResponseFromApi(
            positionData.value.latitude,
            positionData.value.longitude,
            process.env.VUE_APP_API_URL
          );
          console.log(res);

          const { name, sys, weather, main, wind } =
            await weatherApi.getResponseFromApi(
              positionData.value.latitude,
              positionData.value.longitude,
              process.env.VUE_APP_API_URL
            );
          weatherData.value.position = `${name}, ${sys.country}`;
          weatherData.value.iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
          weatherData.value.main = main;
          weatherData.value.wind = wind;
        }
      } catch (e: any) {
        throw new Error(e);
      }
    }
    //????
    setDataFromApi();

    return {
      weatherData,
    };
  },
});
</script>

<style scoped lang="scss">
.weather-widget {
  display: flex;
}
</style>

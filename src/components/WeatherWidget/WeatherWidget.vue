<template>
  <div v-if="!widgetRef.isLodaingData" class="widget">
    <button @click="settingsHandler" class="widget__settings">
      <SettingsIcon v-if="!widgetRef.isShowSettings" />
      <CloseIcon v-else />
    </button>
    <div v-if="!widgetRef.isShowSettings" class="widget__cards">
      <WeatherCard v-for="(val, idx) in weatherRef" :key="idx" :weather="val" />
    </div>
    <WidgetSettings v-else />
  </div>
</template>
<script lang="ts">
import { weatherApi } from "@/api";
import { defineComponent, ref } from "vue";
import { WeatherMainDataT, WeatherRefT, WidgetRefT } from "@/types";
import SettingsIcon from "@/components/Icons/SettingsIcon.vue";
import WidgetSettings from "@/components/WeatherWidget/WidgetSettings/WidgetSettings.vue";
import CloseIcon from "@/components/Icons/CloseIcon.vue";
import WeatherCard from "@/components/WeatherWidget/WeatherCard/WeatherCard.vue";

export default defineComponent({
  name: "WeatherWidget",
  components: { WeatherCard, CloseIcon, WidgetSettings, SettingsIcon },
  setup() {
    //state
    const widgetRef = ref<WidgetRefT>({
      isShowSettings: false,
      isLodaingData: false,
    });
    const weatherRef = ref<WeatherRefT>([
      {
        longitude: 0,
        latitude: 0,
        position: "",
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
    ]);
    // check of local storage
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
      weatherRef.value[0].latitude = Number(localStorage.getItem("latitude"));
      weatherRef.value[0].longitude = Number(localStorage.getItem("longitude"));
    }
    //record coordinates
    // eslint-disable-next-line no-undef
    async function setLocalPosition(position: GeolocationPosition) {
      localStorage.setItem("latitude", `${position.coords.latitude}`);
      localStorage.setItem("longitude", `${position.coords.longitude}`);
    }
    //fetching data from weather api
    async function setDataFromApi() {
      try {
        widgetRef.value.isLodaingData = true;
        if (weatherRef.value[0].latitude && weatherRef.value[0].longitude) {
          const res = await weatherApi.getResponseFromApi(
            weatherRef.value[0].latitude,
            weatherRef.value[0].longitude,
            process.env.VUE_APP_API_URL
          );
          console.log(res);
          const { name, sys, clouds, visibility, weather, main, wind } =
            await weatherApi.getResponseFromApi(
              weatherRef.value[0].latitude,
              weatherRef.value[0].longitude,
              process.env.VUE_APP_API_URL
            );
          weatherRef.value[0].position = `${name}, ${sys.country}`;
          weatherRef.value[0].weatherIcons = weather;
          weatherRef.value[0].main = main;
          weatherRef.value[0].wind = wind;
          weatherRef.value[0].cloudiness = clouds.all;
          weatherRef.value[0].visibility = visibility;
          //set icon
          weather.forEach((el) => {
            el.icon = `https://openweathermap.org/img/wn/${el.icon}@2x.png`;
          });
          //округляем значения погоды
          for (let key in weatherRef.value[0].main) {
            const mainKey = key as keyof WeatherMainDataT;
            weatherRef.value[0].main[mainKey] = Math.round(
              weatherRef.value[0].main[mainKey]
            );
          }
        }
      } catch (e: any) {
        throw new Error(e);
      } finally {
        widgetRef.value.isLodaingData = false;
      }
    }
    function settingsHandler() {
      widgetRef.value.isShowSettings = !widgetRef.value.isShowSettings;
    }
    setDataFromApi();
    return {
      weatherRef,
      widgetRef,
      settingsHandler,
    };
  },
});
</script>

<style scoped lang="scss">
.widget {
  position: relative;
  font-family: "Open sans", sans-serif;
  padding: 8px;
  background-color: #fff;
  color: #0f0f0f;
  min-height: 245px;
  width: 245px;
  &__settings {
    cursor: pointer;
    position: absolute;
    right: 16px;
    top: 16px;
  }
  &__cards {
    display: flex;
    flex-direction: column;
  }
}
</style>

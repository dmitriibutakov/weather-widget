<script lang="ts">
import { defineComponent } from "vue";
import SettingsIcon from "@/components/Icons/SettingsIcon.vue";
import CloseIcon from "@/components/Icons/CloseIcon.vue";
import WeatherCard from "@/components/WeatherWidget/WeatherCard/WeatherCard.vue";
import WeatherSettings from "@/components/WeatherWidget/WeatherSettings/WeatherSettings.vue";
import { storeToRefs } from "pinia";
import { useWeatherStore } from "@/store/weather";
import { useCommonStore } from "@/store/common";

export default defineComponent({
  name: "WeatherWidget",
  components: { WeatherSettings, WeatherCard, CloseIcon, SettingsIcon },
  async created() {
    await useWeatherStore().fetchWeatherData();
  },
  setup() {
    const { getWeather } = storeToRefs(useWeatherStore());
    const { getIsLoading, getIsShowSettings, getError } = storeToRefs(
      useCommonStore()
    );
    const { toggleShowSettings } = useCommonStore();
    return {
      getWeather,
      toggleShowSettings,
      getIsLoading,
      getError,
      getIsShowSettings,
    };
  },
});
</script>

<template>
  <div v-if="!getIsLoading" class="widget">
    <button @click="toggleShowSettings" class="widget__settings">
      <settings-icon v-if="!getIsShowSettings" />
      <close-icon v-else />
    </button>
    <div v-if="!getIsShowSettings && !getError" class="widget__cards">
      <weather-card
        v-for="(val, idx) in getWeather"
        :key="idx"
        :weather-item="val"
      />
    </div>
    <p class="widget__error" v-else-if="!getIsShowSettings && getError">
      {{ getError }}
    </p>
    <weather-settings v-else />
  </div>
</template>

<style scoped lang="scss">
.widget {
  position: relative;
  font-family: "Open sans", sans-serif;
  padding: 8px;
  line-height: 1.21;
  background-color: #fff;
  color: #0f0f0f;
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

  &__error {
    width: 90%;
  }
}
</style>

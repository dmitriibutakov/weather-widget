<script lang="ts">
import { defineComponent } from "vue";

import { storeToRefs } from "pinia";
import { useCommonStore } from "@/store/common";
import { useWeatherStore } from "@/store/weather";
import WeatherSettings from "@/components/WeatherSettings/WeatherSettings.vue";
import WeatherCard from "@/components/WeatherCard/WeatherCard.vue";
import CloseIcon from "@/components/Icons/CloseIcon/CloseIcon.vue";
import SettingsIcon from "@/components/Icons/SettingsIcon/SettingsIcon.vue";

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
  <div id="app" class="widget">
    <button @click="toggleShowSettings" class="widget__settings">
      <settings-icon v-if="!getIsShowSettings" />
      <close-icon v-else />
    </button>
    <div v-if="!getIsShowSettings" class="widget__cards">
      <p class="widget__cards_error" v-if="getError && !getIsLoading">
        {{ getError }}
      </p>
      <div
        v-else-if="getWeather.some((el) => el.position.city)"
        class="widget__cards_wrapper"
      >
        <weather-card
          v-for="(val, idx) in getWeather"
          :key="idx"
          :weather-item="val"
        />
      </div>
      <div class="widget__cards_empty" v-else>
        Add new city in the settings or confirm access to your geolocation.
      </div>
    </div>
    <weather-settings v-else />
  </div>
</template>

<style scoped lang="scss">
@import "assets/reset.css";

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

  &__cards_wrapper {
    display: flex;
    flex-direction: column;

    & > *:not(:last-child) {
      margin-bottom: 8px;
    }
  }

  &__cards_error,
  &__cards_empty {
    font-size: 16px;
    font-weight: 500;
    border: 1px solid #eee;
    height: 100px;
    border-radius: 8px;
    padding: 8px 24px 4px 4px;
  }

  &__cards_error {
    color: #bd5353;
  }
}
</style>

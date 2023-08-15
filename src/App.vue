<template>
  <div id="app">
    <WeatherWidget />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WeatherWidget from "./components/WeatherWidget/WeatherWidget.vue";
export default defineComponent({
  name: "App",
  components: { WeatherWidget },
});
</script>

<style lang="scss">
/* Стили для главного приложения */
</style>

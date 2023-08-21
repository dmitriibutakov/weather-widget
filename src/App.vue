<script lang="ts">
import { defineComponent } from "vue";
import WeatherWidget from "@/components/WeatherWidget/WeatherWidget.vue";

export default defineComponent({
  name: "App",
  components: { WeatherWidget },
});
</script>

<template>
  <div id="app">
    <weather-widget />
  </div>
</template>
<style lang="scss">
@import "./assets/reset.css";
</style>

<template>
  <div class="weather">
    <div class="weather__country">
      {{ weather.position }}
    </div>
    <!-- {{ weatherRef.main }} -->
    <div class="weather__condition">
      <img :src="weather.weatherIcons[0].icon" alt="weather" />
      {{ weather.main.temp }}°C
    </div>
    Feels like {{ weather.main.feels_like }}°C,
    {{ weather.weatherIcons[0].description }}
    <div class="weather__addition">
      <p v-for="(val, idx) in weatherAddition()" :key="idx">
        <span v-if="val.name == 'Wind'"
          ><WindIcon :deg="weather.wind.deg"
        /></span>
        <span v-else-if="val.name == 'Pressure'"><PressureIcon /></span>
        <span v-else-if="val.name == 'Humidity'">Humidity:</span>
        <span v-else-if="val.name == 'Cloudiness'"><CloudinessIcon /></span>
        <span v-else-if="val.name == 'Visibility'">Visibility:</span>
        {{ val.value }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { WeatherCardT } from "@/types";
import PressureIcon from "@/components/Icons/PressureIcon.vue";
import WindIcon from "@/components/Icons/WindIcon.vue";
import CloudinessIcon from "@/components/Icons/CloudinessIcon.vue";

export default defineComponent({
  name: "WeatherCard",
  components: { PressureIcon, WindIcon, CloudinessIcon },
  props: {
    weather: {
      type: Object as () => WeatherCardT,
      required: true,
    },
  },
  setup(props) {
    function weatherAddition() {
      return [
        { name: "Wind", value: `${props.weather.wind.speed}m/s` },
        { name: "Pressure", value: `${props.weather.main.pressure}hPa` },
        { name: "Humidity", value: `${props.weather.main.humidity}%` },
        { name: "Cloudiness", value: `${props.weather.cloudiness}%` },
        {
          name: "Visibility",
          value: `${(props.weather.visibility / 1000).toFixed(1) + "km"}`,
        },
      ];
    }
    return {
      weatherAddition,
    };
  },
});
</script>

<style lang="scss" scoped>
.weather {
  @include cardLayout;
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
</style>

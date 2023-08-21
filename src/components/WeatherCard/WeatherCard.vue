<script lang="ts">
import { defineComponent } from "vue";
import { useCommonStore } from "@/store/common";
import WeatherCardSkeleton from "@/components/WeatherCard/WeatherCardSkeleton.vue";
import PressureIcon from "@/components/Icons/PressureIcon/PressureIcon.vue";
import WindIcon from "@/components/Icons/WindIcon/WindIcon.vue";
import CloudinessIcon from "@/components/Icons/CloudinessIcon/CloudinessIcon.vue";
import { WeatherData } from "@/types";

export default defineComponent({
  name: "WeatherCard",
  methods: { useCommonStore },
  components: {
    WeatherCardSkeleton,
    PressureIcon,
    WindIcon,
    CloudinessIcon,
  },
  props: {
    weatherItem: {
      type: Object as () => WeatherData,
      required: true,
    },
  },
  setup(props) {
    function weatherAddition() {
      return [
        { name: "Wind", value: `${props.weatherItem.wind.speed}m/s` },
        { name: "Pressure", value: `${props.weatherItem.main.pressure}hPa` },
        { name: "Humidity", value: `${props.weatherItem.main.humidity}%` },
        { name: "Cloudiness", value: `${props.weatherItem.cloudiness}%` },
        {
          name: "Visibility",
          value: `${(props.weatherItem.visibility / 1000).toFixed(1) + "km"}`,
        },
      ];
    }

    return {
      weatherAddition,
    };
  },
});
</script>

<template>
  <WeatherCardSkeleton v-if="useCommonStore().getIsLoading" />
  <div v-else class="weather">
    <h5 class="weather__country">
      {{ weatherItem.position.city }}, {{ weatherItem.position.country }}
    </h5>
    <div class="weather__condition">
      <img :src="weatherItem.weatherIcons[0].icon" alt="weather" />
      {{ weatherItem.main.temp }}°C
    </div>
    Feels like {{ weatherItem.main.feels_like }}°C,
    {{ weatherItem.weatherIcons[0].description }}
    <div class="weather__addition addition">
      <div
        class="addition__wrapper"
        v-for="(val, idx) in weatherAddition()"
        :key="idx"
      >
        <div class="addition__wrapper_item item">
          <span v-if="val.name == 'Wind'">
            <WindIcon :deg="weatherItem.wind.deg" />
          </span>
          <span v-else-if="val.name == 'Pressure'">
            <PressureIcon />
          </span>
          <span v-else-if="val.name == 'Humidity'">Humidity:</span>
          <span v-else-if="val.name == 'Cloudiness'">
            <CloudinessIcon />
          </span>
          <span v-else-if="val.name == 'Visibility'">Visibility:</span>
          {{ val.value }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.weather {
  @include cardLayout;

  &__country {
    display: flex;
    justify-content: flex-start;
  }

  &__condition {
    display: flex;
    align-items: center;
    font-size: 48px;
    font-weight: 300;
    height: 100px;

    img {
      width: 100px;
      height: 100px;
    }
  }

  @include additionLayout;
}
</style>

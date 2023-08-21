<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "WeatherCardSkeleton",
});
</script>

<template>
  <div class="weather">
    <h5 class="weather__country"></h5>
    <div class="weather__condition"></div>
    <div class="weather__addition addition">
      <div class="addition__wrapper" v-for="(val, idx) in 5" :key="idx">
        <div class="addition__wrapper_item item"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.weather {
  @include cardLayout;

  &__country,
  &__condition,
  .item {
    background: #eee;
    background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
    border-radius: 8px;
    background-size: 200% 100%;
    animation: 1.5s shine linear infinite;
  }

  &__country {
    height: 20px;
    margin-right: 24px;
    margin-bottom: 8px;
  }

  &__condition {
    height: 100px;
  }
  @include additionLayout;
}
</style>

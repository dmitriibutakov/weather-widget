<script lang="ts">
import { defineComponent } from "vue";
import DraggableCities from "@/components/WeatherWidget/WeatherSettings/DraggableCities.vue";
import AddLocation from "@/components/WeatherWidget/WeatherSettings/AddLocation/AddLocation.vue";
import { WeatherData } from "@/types";

interface Settings {
  items: WeatherData[];
  over: { item: any; pos: any; dir: any };
  startLoc: number;
  dragging: boolean;
  dragFrom: any;
}

export default defineComponent({
  name: "WeatherSettings",
  components: { AddLocation, DraggableCities },
});
</script>

<template>
  <div class="settings">
    <h5 class="settings__title">Settings</h5>
    <draggable-cities />
    <add-location />
  </div>
</template>

<style lang="scss" scoped>
.settings {
  @include cardLayout;

  &__title {
    margin-bottom: 8px;
  }
}
</style>

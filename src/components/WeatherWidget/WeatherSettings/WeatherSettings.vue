<script lang="ts">
import { defineComponent, ref } from "vue";
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
  props: {
    weather: {
      type: Array as () => WeatherData[],
      required: true,
    },
  },
  setup(props) {
    const citySearchRef = ref<{ city: string; error: string }>({
      city: "",
      error: "",
    });
    const settingsRef = ref<Settings>({
      items: props.weather,
      over: {
        item: "",
        pos: "",
        dir: "",
      },
      startLoc: 0,
      dragging: false,
      dragFrom: {},
    });

    function startDrag(item: any, i: any, e: any) {
      settingsRef.value.startLoc = e.clientY;
      settingsRef.value.dragging = true;
      settingsRef.value.dragFrom = item;
    }

    function finishDrag(item: any, pos: any) {
      settingsRef.value.items.splice(pos, 1);
      settingsRef.value.items.splice(settingsRef.value.over.pos, 0, item);
      settingsRef.value.over = { item: "", pos: "", dir: "" };
    }

    function onDragOver(item: any, pos: any, e: any) {
      const dir = settingsRef.value.startLoc < e.clientY ? "down" : "up";
      settingsRef.value.over = { item, pos, dir };
    }

    function inputHandler(val: string) {
      if (citySearchRef.value.error.length > 0) {
        citySearchRef.value.error = "";
      }
      citySearchRef.value.city = val;
    }

    function searchCity() {
      if (citySearchRef.value.city.length >= 3) {
        console.log(citySearchRef.value.city);
      } else {
        citySearchRef.value.error = "must be > 3 symbols";
      }
      citySearchRef.value.city = "";
    }

    return {
      settingsRef,
      onDragOver,
      searchCity,
      finishDrag,
      startDrag,
      inputHandler,
      citySearchRef,
    };
  },
});
</script>

<template>
  <div class="settings">
    <h5 class="settings__title">Settings</h5>
    <draggable-cities
      :finish-drag="finishDrag"
      :on-drag-over="onDragOver"
      :start-drag="startDrag"
      :settings="settingsRef"
    />
    <add-location
      :searchCity="searchCity"
      :city-value="citySearchRef.city"
      :error="citySearchRef.error"
      @customChange="inputHandler"
    />
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

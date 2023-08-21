<script>
import MenuIcon from "@/components/Icons/MenuIcon.vue";
import DeleteIcon from "@/components/Icons/DeleteIcon.vue";
import { storeToRefs } from "pinia";
import { useWeatherStore } from "@/store/weather";

export default {
  components: { DeleteIcon, MenuIcon },
  setup() {
    const { startDrag, deleteCity, finishDrag, onDragOver } = useWeatherStore();
    const { getWeather, getOver, getDragFrom, getDragging, getStartLoc } =
      storeToRefs(useWeatherStore());
    return {
      getWeather,
      startDrag,
      finishDrag,
      onDragOver,
      deleteCity,
      getOver,
      getDragFrom,
      getDragging,
      getStartLoc,
    };
  },
};
</script>

<template>
  <transition-group
    v-if="getWeather.some((el) => el.position.city)"
    name="flip-list"
    tag="div"
    class="drag"
  >
    <li
      v-for="(val, idx) in getWeather"
      @dragover="(e) => onDragOver(val, idx, e)"
      @dragend="() => finishDrag(val, idx)"
      @dragstart="(e) => startDrag(val, idx, e)"
      :class="[
        'drag__item',
        {
          drag__item_over: val === getOver.item && val !== getDragFrom,
          [getOver.dir]: val === getOver.item && val !== getDragFrom,
        },
      ]"
      draggable="true"
      :key="idx"
    >
      <menu-icon style="cursor: grab" />
      <span>{{ val.position.city }}, {{ val.position.country }}</span>
      <button @click="() => deleteCity(idx)">
        <delete-icon style="cursor: pointer" />
      </button>
    </li>
  </transition-group>
</template>

<style lang="scss" scoped>
.drag {
  flex: 1;

  &__item {
    width: 200px;
    padding: 8px 6px;
    margin: 8px auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #eeeeee;

    span {
      flex: 0 0 70%;
      font-size: 14px;
      font-weight: 500;
      margin: auto 0;
    }

    &_over {
      opacity: 0.6;
    }
  }
}

.down {
  transform: translateY(-20px);
}

.up {
  transform: translateY(20px);
}
</style>

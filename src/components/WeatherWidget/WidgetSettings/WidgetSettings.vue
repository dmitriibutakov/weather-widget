<template>
  <div class="settings">
    Settings
    <transition-group name="flip-list" tag="div" class="settings__drag">
      <li
        v-for="(item, i) in settingsRef.items"
        @dragover="(e) => onDragOver(item, i, e)"
        @dragend="() => finishDrag(item, i)"
        @dragstart="(e) => startDrag(item, i, e)"
        class="settings__drag_item"
        :class="{
          over: item === settingsRef.over.item && item !== settingsRef.dragFrom,
          [settingsRef.over.dir]:
            item === settingsRef.over.item && item !== settingsRef.dragFrom,
        }"
        draggable="true"
        :key="item"
      >
        <MenuIcon />
        <span>{{ item }}</span>
        <DeleteIcon />
      </li>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import MenuIcon from "@/components/Icons/MenuIcon.vue";
import DeleteIcon from "@/components/Icons/DeleteIcon.vue";

interface Settings {
  items: string[];
  over: { item: any; pos: any; dir: any };
  startLoc: number;
  dragging: boolean;
  dragFrom: any;
}
export default defineComponent({
  name: "WidgetSettings",
  components: { DeleteIcon, MenuIcon },
  setup() {
    const settingsRef = ref<Settings>({
      items: ["one", "two", "three", "four"],
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
    return {
      settingsRef,
      onDragOver,
      finishDrag,
      startDrag,
    };
  },
});
</script>

<style lang="scss" scoped>
.settings {
  @include cardLayout;
  &__drag {
    &_item {
      width: 200px;
      padding: 8px;
      margin: 8px auto 8px 8px;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      background-color: antiquewhite;
      span {
        flex: 0 0 70%;
      }
    }
  }
}
</style>

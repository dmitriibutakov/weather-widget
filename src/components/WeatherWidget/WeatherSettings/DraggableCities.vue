<script>
import MenuIcon from "@/components/Icons/MenuIcon.vue";
import DeleteIcon from "@/components/Icons/DeleteIcon.vue";

export default {
  components: { DeleteIcon, MenuIcon },
  props: {
    settings: {
      type: Object,
      required: true,
    },
    onDragOver: { type: Function, required: true },
    finishDrag: { type: Function, required: true },
    startDrag: { type: Function, required: true },
  },
};
</script>

<template>
  <transition-group name="flip-list" tag="div" class="settings__drag drag">
    <li
      v-for="(val, idx) in settings.items"
      @dragover="(e) => onDragOver(val, idx, e)"
      @dragend="() => finishDrag(val, idx)"
      @dragstart="(e) => startDrag(val, idx, e)"
      :class="[
        'drag__item',
        {
          drag__item_over:
            val === settings.over.item && val !== settings.dragFrom,
          [settings.over.dir]:
            val === settings.over.item && val !== settings.dragFrom,
        },
      ]"
      draggable="true"
      :key="idx"
    >
      <menu-icon style="cursor: grab" />
      <span>{{ val.position }}</span>
      <delete-icon style="cursor: pointer" />
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
    align-items: flex-start;
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

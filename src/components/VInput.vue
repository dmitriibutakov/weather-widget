<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "VInput",
  props: {
    type: { type: String, default: "text" },
    value: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    function handlerChange(event: Event) {
      const { target } = event;
      emit("customChange", (target as HTMLInputElement).value.trim());
    }

    return {
      handlerChange,
    };
  },
});
</script>

<template>
  <input class="input" :value="value" :type="type" @input="handlerChange" />
</template>

<style scoped lang="scss">
.input {
  border: 1px solid #e0e0e0;
  border-radius: 2px;
  padding: 4px 2px;

  &:focus {
    border-color: #30a3e1;
  }
}
</style>

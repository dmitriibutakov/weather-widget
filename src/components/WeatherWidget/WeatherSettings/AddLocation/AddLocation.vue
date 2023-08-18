<script lang="ts">
import { defineComponent } from "vue";
import VInput from "@/components/VInput.vue";
import EnterIcon from "@/components/Icons/EnterIcon.vue";

export default defineComponent({
  name: "AddLocation",
  components: { EnterIcon, VInput },
  props: {
    searchCity: {
      type: Function,
      required: true,
    },
    cityValue: {
      type: String,
      required: true,
    },
    error: {
      type: String,
      required: true,
    },
  },
});
</script>

<template>
  <div class="location">
    <h5 class="location__title">Add Location</h5>
    <div class="location__interactive">
      <v-input
        :value="cityValue"
        @customChange="(value) => this.$emit('customChange', value)"
      />
      <button style="cursor: pointer" @click="searchCity">
        <enter-icon />
      </button>
    </div>
    <p class="location__error">{{ error }}</p>
  </div>
</template>

<style scoped lang="scss">
.location {
  position: relative;
  padding-bottom: 16px;

  &__title {
    margin-bottom: 6px;
  }

  &__interactive {
    display: flex;

    & > :first-child {
      margin-right: 8px;
    }
  }

  &__error {
    position: absolute;
    bottom: 0;
    left: 0;
    font-size: 12px;
    color: #b04545;
  }
}
</style>

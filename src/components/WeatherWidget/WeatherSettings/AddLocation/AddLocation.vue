<script lang="ts">
import { defineComponent, ref } from "vue";
import VInput from "@/components/VInput.vue";
import EnterIcon from "@/components/Icons/EnterIcon.vue";
import { useWeatherStore } from "@/store/weather";

export default defineComponent({
  name: "AddLocation",
  components: { EnterIcon, VInput },
  setup() {
    const citySearchRef = ref<{ city: string; error: string }>({
      city: "",
      error: "",
    });

    function inputHandler(val: string) {
      if (citySearchRef.value.error.length > 0) {
        citySearchRef.value.error = "";
      }
      citySearchRef.value.city = val;
    }

    function searchCityHandler() {
      if (citySearchRef.value.city.length < 4) {
        citySearchRef.value.error = "minimum 3 symbols";
      } else {
        useWeatherStore().searchCity(citySearchRef.value.city);
      }
      citySearchRef.value.city = "";
    }

    return {
      citySearchRef,
      inputHandler,
      searchCityHandler,
    };
  },
});
</script>

<template>
  <div class="location">
    <h5 class="location__title">Add Location</h5>
    <div class="location__interactive">
      <v-input
        :input-enter-cb="searchCityHandler"
        :value="citySearchRef.city"
        @customChange="inputHandler"
      />
      <button style="cursor: pointer" @click="searchCityHandler">
        <enter-icon />
      </button>
    </div>
    <p class="location__error">{{ citySearchRef.error }}</p>
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

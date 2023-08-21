<script lang="ts">
import { defineComponent, ref } from "vue";
import VInput from "@/components/VInput.vue";
import EnterIcon from "@/components/Icons/EnterIcon.vue";
import { useWeatherStore } from "@/store/weather";
import { useCommonStore } from "@/store/common";
import VLoader from "@/components/VLoader.vue";

export default defineComponent({
  name: "AddLocation",
  methods: { useCommonStore },
  components: { VLoader, EnterIcon, VInput },
  setup() {
    const citySearchRef = ref<{ city: string }>({
      city: "",
    });

    function inputHandler(val: string) {
      if (useCommonStore().getError) {
        useCommonStore().setError("");
      }
      citySearchRef.value.city = val;
    }

    async function searchCityHandler() {
      await useWeatherStore().addCity(citySearchRef.value.city);
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
        <v-loader v-if="useCommonStore().getIsLoading" />
        <enter-icon v-else />
      </button>
    </div>
    <p class="location__error">{{ useCommonStore().getError }}</p>
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

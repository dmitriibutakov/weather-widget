<template>
  <svg
    class="wind"
    :style="{ '--rotate': deg + 'deg' }"
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 512 512"
  >
    <g
      transform="translate(0.000000,512) scale(0.100000,-0.100000)"
      fill="#0f0f0f"
      stroke="none"
    >
      <path
        d="M2485 5111 c-101 -26 -171 -88 -219 -192 -18 -41 -451 -1075 -962
-2299 l-928 -2225 0 -75 c0 -92 23 -148 89 -219 75 -80 191 -117 292 -92 26 7
443 205 926 442 l877 430 878 -430 c482 -237 899 -435 925 -442 101 -25 217
12 292 92 66 71 89 127 89 219 l0 75 -938 2250 c-516 1238 -952 2276 -969
2308 -52 99 -141 156 -256 162 -36 2 -79 1 -96 -4z"
      />
    </g>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "WindIcon",
  props: {
    deg: { type: Number, required: true },
  },
});
</script>

<style scoped lang="scss">
.compass {
  transform: rotate(var(--rotate));
}
</style>

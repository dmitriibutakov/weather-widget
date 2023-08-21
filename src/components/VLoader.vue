<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "VLoader",
});
</script>

<template>
  <div class="loader center"><span></span></div>
</template>

<style scoped lang="scss">
.loader {
  display: block;
  height: 16px;
  width: 16px;
  -webkit-animation: loader1 3s linear infinite;
  animation: loader1 3s linear infinite;

  span {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    height: 16px;
    width: 16px;
    clip: rect(8px, 16px, 16px, 0);
    -webkit-animation: loader2 1.5s cubic-bezier(0.77, 0, 0.175, 1) infinite;
    animation: loader2 1.5s cubic-bezier(0.77, 0, 0.175, 1) infinite;

    &::before {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      height: 16px;
      width: 16px;
      border: 3px solid transparent;
      border-top: 3px solid #eee;
      border-radius: 50%;
      -webkit-animation: loader3 1.5s cubic-bezier(0.77, 0, 0.175, 1) infinite;
      animation: loader3 1.5s cubic-bezier(0.77, 0, 0.175, 1) infinite;
    }

    &::after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      height: 16px;
      width: 16px;
      border: 3px solid #0f0f0f;
      border-radius: 50%;
    }
  }
}

@-webkit-keyframes loader1 {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes loader1 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes loader2 {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes loader2 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes loader3 {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes loader3 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

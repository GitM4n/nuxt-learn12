<template>
  <div class="error">
      <div class="error__inner">
      <div class="error__text text-white text-8xl font-mono font-bold text-center">
          Упс! Что-то пошло не так :(
        </div>
      </div>
  </div>
</template>

<script lang="ts" setup>

</script>



<style>

.error{
  width: 100vw;
  height: 100vh;
  background-color: rgba(252, 54, 54, 0.952);
  position: absolute;
  z-index: 9999;
  top: 0;
}

.error__text{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>
<template>
  <div class="load-indicator">
  <p class="loading-text text-white text-4xl font-mono font-bold">LOADING...</p>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>
.load-indicator{
  top: 0;
  pointer-events: none;
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  background-color: green;
  opacity: 0.8;
}

.loading-text{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}


</style>
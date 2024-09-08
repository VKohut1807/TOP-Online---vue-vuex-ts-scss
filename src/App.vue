<script setup lang="ts">
import TopoMainHeader from "@/components/common/Header.vue";
import TopoMainFooter from "@/components/common/Footer.vue";
</script>

<template>
  <topo-main-header />
  <main>
    <router-view />
  </main>
  <topo-main-footer />
</template>

<style lang="scss">
@import "@scss/config/config.scss";

#app {
  background-color: $secondary_10;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  main {
    display: block;
    flex-grow: 1;
    height: 100%;
  }
}
</style>

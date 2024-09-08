<script setup lang="ts">
import {onMounted} from "vue";
import TopoMainHeader from "@/components/common/Header.vue";
import TopoMainFooter from "@/components/common/Footer.vue";

import {useStore} from "vuex";

import {AuthActions} from "@/store/modules/auth";

const store = useStore();

onMounted(() => {
  store.dispatch(AuthActions.getCurrentUser);
});
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

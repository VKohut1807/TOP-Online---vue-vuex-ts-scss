<script setup lang="ts">
import {onMounted} from "vue";
import {useStore} from "vuex";

import TopoMainHeader from "@/components/common/Header.vue";
import TopoMainFooter from "@/components/common/Footer.vue";
import TopoBreadcrumbs from "@/components/common/Breadcrumbs.vue";

import {AuthActions} from "@/store/modules/auth";

const store = useStore();

onMounted(() => {
  store.dispatch(AuthActions.getCurrentUser);
});
</script>

<template>
  <topo-main-header />
  <topo-breadcrumbs />
  <main>
    <router-view />
  </main>
  <topo-main-footer />
</template>

<style lang="scss">
@import "@scss/config/config.scss";

// * {
//   outline: 1px solid red;
// }

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

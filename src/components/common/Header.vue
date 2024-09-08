<script lang="ts" setup>
import {ref, Ref} from "vue";

import TopoNavBar from "@/components/common/NavBar.vue";
import TopoNavigationDrawers from "@/components/common/NavigationDrawers.vue";

const navDrawerToggle: Ref<boolean> = ref(false);

const updateNavDrawer = (newValue: boolean) => {
  navDrawerToggle.value = newValue;
};
</script>

<template>
  <header>
    <topo-nav-bar
      :nav-drawer-toggle="navDrawerToggle"
      @update-nav-drawer-toggle="updateNavDrawer"
    />
    <topo-navigation-drawers :nav-drawer-toggle="navDrawerToggle" />
  </header>
</template>

<style scoped lang="scss">
header {
  position: sticky;
  top: 0;
  width: 100%;
  overflow-x: clip;
  z-index: 10;
}
</style>

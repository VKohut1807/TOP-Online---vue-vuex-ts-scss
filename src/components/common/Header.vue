<script lang="ts" setup>
import {ref, Ref, computed, ComputedRef} from "vue";
import {useStore} from "vuex";

import TopoNavBar from "@/components/common/NavBar.vue";
import TopoNavigationDrawers from "@/components/common/NavigationDrawers.vue";

import {AuthGetters} from "@/store/modules/auth";
import {AuthTypes} from "@/types/auth-types";

const store = useStore();

const navDrawerToggle: Ref<boolean> = ref(false);

const updateNavDrawer = (newValue: boolean) => {
  navDrawerToggle.value = newValue;
};

const isLoggedIn: ComputedRef<AuthTypes["isLoggedIn"]> = computed(() => {
  return store.getters[AuthGetters.isLoggedIn];
});
</script>

<template>
  <header>
    <topo-nav-bar
      :nav-drawer-toggle="navDrawerToggle"
      @update-nav-drawer-toggle="updateNavDrawer"
    />

    <topo-navigation-drawers
      :nav-drawer-toggle="isLoggedIn ? navDrawerToggle : false"
    />
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

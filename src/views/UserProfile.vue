<script setup lang="ts">
import {computed, ComputedRef} from "vue";
import {useRoute} from "vue-router";
import {useStore} from "vuex";

import {ModuleType} from "@/types/module-types";

const route = useRoute();
const store = useStore();

const isLoading: ComputedRef<ModuleType["isLoading"]> = computed(() => {
  return store.state.userProfile.isLoading;
});

const userProfile: ComputedRef<ModuleType["data"]> = computed(() => {
  return store.state.userProfile.data;
});

const error: ComputedRef<ModuleType["error"]> = computed(() => {
  return store.state.userProfile.error;
});
</script>

<template>
  <section v-if="userProfile" id="user-profile" class="user-profile">
    <div class="wrapper">
      <div class="container">
        <div class="section-up">
          <div class="image-box">
            <img src="" alt="" />
          </div>
          <div class=""></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "@scss/config/config.scss";

.user-profile {
  .container {
    .section-up {
      .image-box {
      }
    }
  }
}
</style>

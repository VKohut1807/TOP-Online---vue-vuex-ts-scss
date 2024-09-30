<script setup lang="ts">
import {computed, ComputedRef} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";

import {AuthTypes} from "@/types/auth-types";
import {AuthGetters} from "@/store/modules/auth";

const store = useStore();
const route = useRoute();

const props = defineProps({
  tagName: {
    type: String,
    required: false,
  },
});

const isLoggedIn: ComputedRef<AuthTypes["isLoggedIn"]> = computed(() => {
  return store.getters[AuthGetters.isLoggedIn];
});

const routeName: ComputedRef<string> = computed(() => {
  return String(route.name);
});
</script>

<template>
  <section id="tabs" class="tabs">
    <router-link
      v-if="isLoggedIn"
      :to="{name: 'my-followed-posts'}"
      :class="{active: routeName === 'my-followed-posts'}"
      class="link-to-page"
    >
      My Followed Posts
    </router-link>
    <router-link
      :to="{name: 'global-posts'}"
      :class="{active: routeName === 'global-posts'}"
      class="link-to-page"
    >
      All Posts
    </router-link>
    <router-link
      v-if="tagName"
      :to="{name: 'tag'}"
      :class="{active: routeName === 'tag'}"
      class="link-to-page"
    >
      <mdicon name="Pound" />{{ tagName }}
    </router-link>
  </section>
</template>

<style scoped lang="scss">
@import "@scss/config/config.scss";

.tabs {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid $third_40;
  max-width: 75%;
  margin-bottom: 2rem;

  @include break("s") {
    max-width: 100%;
  }

  .link-to-page {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    padding: 0.5rem 0.25rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: $primary;
    transition: background-color 0.3s ease-in-out;
    border-radius: 0.5rem;
    margin-bottom: auto;

    &:hover {
      background-color: $secondary_20;
    }

    &.active {
      position: relative;
      background-color: $secondary_20;
      box-shadow: 0.5rem 0.5rem 0.65rem $secondary_40;
    }
  }
}
</style>

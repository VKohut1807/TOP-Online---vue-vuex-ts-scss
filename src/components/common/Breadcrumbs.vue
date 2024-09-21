<script setup lang="ts">
import {computed, ComputedRef, reactive} from "vue";
import {useRoute} from "vue-router";

import {Breadcrumbs} from "@/types/breadcrumbs-types";

const route = useRoute();

const breadcrumbs: ComputedRef<Breadcrumbs[]> = computed(() => {
  return (route.meta.breadcramb as Breadcrumbs[]) || [];
});
</script>

<template>
  <section id="breadcrumbs" class="breadcrumbs">
    <div class="wrapper">
      <div class="row">
        <router-link
          v-for="(breadcramb, idx) in breadcrumbs"
          :key="idx"
          :to="{name: breadcramb.name}"
          class="breadcrumb-link"
        >
          <mdicon :name="breadcramb.icon" />
          <span
            class="title"
            :class="{
              active: breadcramb.name == route.name,
            }"
            >{{ breadcramb.title }}</span
          >
          <mdicon v-if="idx < breadcrumbs.length - 1" name="ArrowRightThin" />
        </router-link>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "@scss/config/config.scss";

.breadcrumbs {
  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 2rem 0;

    .breadcrumb-link {
      font-size: 1.25rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      color: $secondary_90;
      transition: color 0.3s ease-in-out;

      &:hover {
        color: $primary_30;
      }

      .title {
        &.active {
          font-weight: 600;
        }
      }
    }
  }
}
</style>

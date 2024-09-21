<script setup lang="ts">
import {computed, ComputedRef} from "vue";
import {range} from "@/helpers/utils";

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
  limitPerPage: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
  articlesCount: {
    type: Number,
    required: true,
  },
});

const pages: ComputedRef<number[]> = computed(() => {
  const pagesCount = Math.ceil(props.articlesCount / props.limitPerPage);
  return range(1, pagesCount);
});
</script>

<template>
  <section id="pagination" class="pagination">
    <div v-for="(page, idx) in pages" :key="idx" class="block">
      <router-link
        :to="{path: url, query: {page: page}}"
        class="link"
        :class="{active: currentPage === page}"
      >
        {{ page }}
      </router-link>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "@scss/config/config.scss";

.pagination {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-top: 3rem;

  .block {
    .link {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 1.5rem;
      aspect-ratio: 1;
      padding: 0.5rem;
      border-radius: 8px;
      border: 1px solid $third_110;
      color: $third_100;
      font-size: 1.25rem;
      font-weight: 600;
      transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out,
        border 0.3s ease-in-out;

      &.active,
      &:hover {
        background-color: $primary;
        color: $secondary;
        border: 1px solid $secondary;
      }
    }
  }
}
</style>

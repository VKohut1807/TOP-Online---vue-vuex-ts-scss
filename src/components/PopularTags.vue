<script setup lang="ts">
import {onMounted, computed, ComputedRef} from "vue";
import {useStore} from "vuex";

import TopoLoading from "@/components/Loading.vue";
import TopoErrorMessage from "@/components/ErrorMessage.vue";

import {PopularTagsActions} from "@/store/modules/popularTags";
import {ModuleType} from "@/types/module-types";

const store = useStore();

const props = defineProps({
  apiUrl: {
    type: String,
    required: true,
  },
});

const isLoading: ComputedRef<ModuleType["isLoading"]> = computed(() => {
  return store.state.popularTags.isLoading;
});
const popularTags: ComputedRef<ModuleType["data"]> = computed(() => {
  return store.state.popularTags.data;
});
const error: ComputedRef<ModuleType["error"]> = computed(() => {
  return store.state.popularTags.error;
});

onMounted(() => {
  store.dispatch(PopularTagsActions.getPopularTags, {
    apiUrl: props.apiUrl,
  });
});
</script>

<template>
  <div class="popular-tags-block">
    <topo-loading v-if="isLoading" />

    <topo-error-message v-if="error" :error-message="error" />

    <div v-if="popularTags" class="popular-tags">
      <h3>Popular Tags</h3>
      <div class="group">
        <router-link
          v-for="(tag, idxTag) in popularTags"
          :key="idxTag"
          :to="{name: 'tag', params: {slug: String(tag)}}"
          class="tag"
        >
          {{ tag }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@scss/config/config.scss";

.popular-tags-block {
  position: sticky;
  top: 7rem;
  height: fit-content;
  background-color: $third_40;
  padding: 0.75rem;
  border-radius: 0.5rem;

  @include break("md") {
    top: 10rem;
  }

  .popular-tags {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    h3 {
      font-size: 1.5rem;
      color: $primary;
    }

    .group {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 0.5rem;

      .tag {
        border-radius: 2rem;
        background-color: $third_120;
        color: #fff;
        padding: 0.5rem;
        width: fit-content;
        height: fit-content;
      }
    }
  }
}
</style>

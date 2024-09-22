<script setup lang="ts">
import {ref, Ref} from "vue";
import {computed, ComputedRef} from "vue";
import {useRoute} from "vue-router";

import TopoPosts from "@/components/Posts.vue";
import TopoPopularTags from "@/components/PopularTags.vue";

import {baseURL} from "@/data/baseURL";

const route = useRoute();

const apiUrl: ComputedRef<string> = computed(() => {
  return `/articles?tag=${route?.params?.slug}`;
});
const apiUrlPopularTags: Ref<string> = ref("/tags");
</script>

<template>
  <section id="tag-posts" class="tag-posts">
    <div class="wrapper">
      <div class="row">
        <topo-posts :api-url="baseURL.posts + apiUrl" />

        <topo-popular-tags :api-url="baseURL.popularTags + apiUrlPopularTags" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "@scss/config/config.scss";

.tag-posts {
  .row {
    position: relative;
    display: grid;
    grid-template-columns: 75% auto;
    gap: 1rem;

    @include break("s") {
      grid-template-columns: 60% auto;
    }
  }
}
</style>

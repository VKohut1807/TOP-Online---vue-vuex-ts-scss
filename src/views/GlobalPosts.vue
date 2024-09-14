<script setup lang="ts">
import {ref, Ref} from "vue";

import TopoPosts from "@/components/Posts.vue";

import {baseURL} from "@/data/baseURL";

const apiUrl: Ref<string> = ref("/articles");
</script>

<template>
  <section id="global-posts" class="global-posts">
    <div class="wrapper">
      <topo-posts :api-url="baseURL.articles + apiUrl" />
    </div>
  </section>
</template>

<style scoped lang="scss"></style>

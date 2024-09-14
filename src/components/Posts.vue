<script setup lang="ts">
import {onMounted} from "vue";
import {useStore} from "vuex";

import {PostsActions} from "@/store/modules/posts";

const store = useStore();

const props = defineProps({
  apiUrl: {
    type: String,
    required: true,
  },
});

onMounted(() => {
  store.dispatch(PostsActions.getPosts, {apiUrl: props.apiUrl});
});
</script>

<template>POSTS</template>

<style scoped lang="scss"></style>

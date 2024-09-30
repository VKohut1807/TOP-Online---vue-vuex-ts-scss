<script setup lang="ts">
import {computed, ComputedRef, onMounted} from "vue";
import {useStore} from "vuex";
import {useRouter, useRoute} from "vue-router";

import TopoPostForm from "@/components/PostForm.vue";
import TopoLoading from "@/components/Loading.vue";
import TopoErrorMessage from "@/components/ErrorMessage.vue";

import {PostType} from "@/types/post-types";
import {ModuleType} from "@/types/module-types";
import {PostActions} from "@/store/modules/post";

const store = useStore();
const router = useRouter();
const route = useRoute();

const isSubmitting: ComputedRef<ModuleType["isSubmitting"]> = computed(() => {
  return store.state.post.isSubmitting;
});

const validationErrors: ComputedRef<ModuleType["validationErrors"]> = computed(
  () => store.state.post.validationErrors || null
);

const isLoading: ComputedRef<ModuleType["isLoading"]> = computed(() => {
  return store.state.post.isLoading;
});

const post: ComputedRef<ModuleType["data"]> = computed(() => {
  return store.state.post.data;
});

const error: ComputedRef<ModuleType["error"]> = computed(() => {
  return store.state.post.error;
});

const initialValues: ComputedRef<PostType | null> = computed(() => {
  if (!post.value) {
    return null;
  }

  return {
    title: post.value.title,
    description: post.value.description,
    body: post.value.body,
    tagList: Array.isArray(post.value.tagList)
      ? post.value.tagList.join(", ")
      : "",
  };
});

const postSlug: ComputedRef<string> = computed(() => {
  const slug = route.params.slug;
  return Array.isArray(slug) ? slug[0] : slug ?? "";
});

const onSubmit = (postInput: PostType): void => {
  store
    .dispatch(PostActions.updatePost, {slug: postSlug.value, postInput})
    .then((post) => router.push({name: "posts", params: {slug: post.slug}}));
};

onMounted(() => {
  store.dispatch(PostActions.getPost, {slug: postSlug.value});
});
</script>

<template>
  <section id="create-post" class="create-post">
    <topo-loading v-if="isLoading" />

    <topo-error-message v-if="error" :error-message="error" />

    <topo-post-form
      v-if="initialValues"
      :initial-values="initialValues"
      :validation-errors="validationErrors"
      :is-submitting="isSubmitting"
      @postSubmit="onSubmit"
    />
  </section>
</template>

<style scoped lang="scss">
@import "@scss/config/config.scss";
</style>

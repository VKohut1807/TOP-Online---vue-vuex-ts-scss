<script setup lang="ts">
import {computed, ComputedRef, reactive} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

import TopoPostForm from "@/components/PostForm.vue";

import {PostType} from "@/types/post-types";
import {ModuleType} from "@/types/module-types";
import {PostActions} from "@/store/modules/post";

const store = useStore();
const router = useRouter();

const initialValues: PostType = reactive({
  title: "",
  description: "",
  body: "",
  tagList: [],
});

const isSubmitting: ComputedRef<ModuleType["isSubmitting"]> = computed(() => {
  return store.state.post.isSubmitting;
});

const validationErrors: ComputedRef<ModuleType["validationErrors"]> = computed(
  () => store.state.post.validationErrors || null
);

const onSubmit = (postInput: PostType): void => {
  store
    .dispatch(PostActions.createPost, {postInput})
    .then((post) => router.push({name: "posts", params: {slug: post.slug}}));
};
</script>

<template>
  <section id="create-post" class="create-post">
    <topo-post-form
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

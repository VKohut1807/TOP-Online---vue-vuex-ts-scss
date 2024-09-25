<script setup lang="ts">
import {reactive} from "vue";
import TopoValidationErrors from "@/components/ValidationErrors.vue";

import {PostType} from "@/types/post-types";

const props = defineProps({
  initialValues: {
    type: Object,
    required: true,
  },
  validationErrors: {
    type: [Object, null],
    required: false,
  },
  isSubmitting: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["post-submit"]);

const dataForm: PostType = reactive({
  title: "",
  description: "",
  body: "",
  TagList: "",
});

const onSubmit = (): void => {
  const form: PostType = {
    title: dataForm.title,
    description: dataForm.description,
    body: dataForm.body,
    TagList: [
      ...String(dataForm.TagList)
        .split(",")
        .flatMap((tag) => tag.trim().split(" ")),
    ],
  };
  emit("post-submit", form);
};
</script>

<template>
  <section id="post-form" class="post-form">
    <div class="wrapper">
      <div class="container">
        <topo-validation-errors
          v-if="props.validationErrors"
          :validation-errors="props.validationErrors"
        />

        <form @submit.prevent="onSubmit">
          <fieldset>
            <fieldset>
              <input type="text" v-model="dataForm.title" placeholder="Title" />
            </fieldset>
            <fieldset>
              <input
                type="text"
                v-model="dataForm.description"
                placeholder="Description"
              />
            </fieldset>
            <fieldset>
              <textarea
                type="text"
                v-model="dataForm.body"
                placeholder="Body"
              ></textarea>
            </fieldset>
            <fieldset>
              <input
                type="text"
                v-model="dataForm.TagList"
                placeholder="Enter Tags"
              />
            </fieldset>
          </fieldset>
          <fieldset>
            <button type="submit" :disabled="isSubmitting">Publish Post</button>
          </fieldset>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "@scss/config/config.scss";
</style>

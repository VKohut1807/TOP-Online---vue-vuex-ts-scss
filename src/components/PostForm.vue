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
  title: props.initialValues.title,
  description: props.initialValues.description,
  body: props.initialValues.body,
  tagList: props.initialValues.tagList,
});

const onSubmit = (): void => {
  const form: PostType = {
    title: dataForm.title,
    description: dataForm.description,
    body: dataForm.body,
    tagList: [
      ...String(dataForm.tagList)
        .split(",")
        .flatMap((tag) => tag.trim().split(" "))
        .filter((tag) => tag.trim().length > 0),
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

        <form @submit.prevent="onSubmit" class="form">
          <div class="row">
            <input
              type="text"
              v-model="dataForm.title"
              placeholder="Title"
              class="input"
            />

            <input
              type="text"
              v-model="dataForm.description"
              placeholder="Description"
              class="input"
            />
          </div>
          <div class="row">
            <textarea
              type="text"
              v-model="dataForm.body"
              placeholder="Body"
              class="textarea"
            ></textarea>
          </div>
          <div class="row">
            <input
              type="text"
              v-model="dataForm.tagList"
              placeholder="Enter Tags"
              class="input"
            />
          </div>
          <button type="submit" :disabled="isSubmitting" class="btn">
            Publish Post
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "@scss/config/config.scss";

.post-form {
  .container {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .form {
      display: flex;
      flex-direction: column;
      gap: 3rem;

      .row {
        display: flex;
        flex-direction: row;
        gap: 2rem;

        @include break("sm") {
          flex-direction: column;
          gap: 3rem;
        }

        .input,
        .textarea {
          border-radius: 0.5rem;
          width: 100%;
          padding: 0.75rem;
          border: none;
          font-size: 1.5rem;
          box-sizing: border-box;
          transition: outline 0.3s ease-in-out,
            background-color 0.3s ease-in-out, color 0.3s ease-in-out;

          &::placeholder {
            letter-spacing: 0.15rem;
          }

          &:focus {
            border: none;
            outline: none;
            background-color: $secondary_20;
            color: $third_120;

            &::placeholder {
              color: $primary_60;
            }
          }
        }

        .textarea {
          min-height: 8rem;
          width: 100%;
        }
      }

      .btn {
        margin-left: auto;
      }
    }
  }
}
</style>

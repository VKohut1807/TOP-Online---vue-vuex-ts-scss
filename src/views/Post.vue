<script setup lang="ts">
import {onMounted, computed, ComputedRef} from "vue";
import TopoLoading from "@/components/Loading.vue";
import TopoErrorMessage from "@/components/ErrorMessage.vue";

import {useRoute} from "vue-router";
import {useStore} from "vuex";

import {ModuleTypes} from "@/types/module-types";
import {PostActions} from "@/store/modules/post";

const route = useRoute();
const store = useStore();

const postSlug: ComputedRef<string> = computed(() => {
  const slug = route.params.slug;
  return Array.isArray(slug) ? slug[0] : slug ?? "";
});

const isLoading: ComputedRef<ModuleTypes["isLoading"]> = computed(() => {
  return store.state.post.isLoading;
});

const post: ComputedRef<ModuleTypes["data"]> = computed(() => {
  return store.state.post.data;
});

const error: ComputedRef<ModuleTypes["error"]> = computed(() => {
  return store.state.post.error;
});

onMounted(() => {
  store.dispatch(PostActions.getPost, {slug: postSlug.value});
});
</script>

<template>
  <section id="active-post" class="active-post">
    <topo-loading v-if="isLoading" />

    <topo-error-message v-if="error" :error-message="error" />

    <div v-if="post" class="wrapper">
      <div class="post-box">
        <div class="head-post">
          <h2 class="title">{{ post.title }}</h2>
          <div class="info-box">
            <router-link
              :to="{name: 'userProfile', params: {slug: post.author.username}}"
              class="link-user-image"
            >
              <img
                :src="post.author.image"
                alt="user logo"
                class="user-image"
              />
            </router-link>
            <div class="short-info">
              <router-link
                :to="{
                  name: 'userProfile',
                  params: {slug: post.author.username},
                }"
                class="user-name"
              >
                {{ post.author.username }}
              </router-link>
              <h6>
                {{ new Date(post.createdAt).toLocaleDateString("en-GB") }}
              </h6>
            </div>

            <!-- IF POST WROTE THIS USER -->
            <router-link
              :to="{name: 'home', params: {slug: post.slug}}"
              class="button gray ml-auto"
            >
              <mdicon name="InvoiceTextEditOutline" />
              Edit Post
            </router-link>
            <button class="button red">
              <mdicon name="FileDocumentRemoveOutline" />
              Delete Post
            </button>
          </div>
        </div>

        <div class="main-post">
          <div class="description">{{ post.body }}</div>
          <div class="tags-group">
            <div
              v-for="(tag, idxTag) in post.tagList"
              :key="idxTag"
              class="tag"
            >
              {{ tag }}
            </div>
          </div>
        </div>

        <div class="footer-post"></div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "@scss/config/config.scss";

.active-post {
  .post-box {
    display: flex;
    flex-direction: column;
    gap: 4rem;

    .head-post {
      display: flex;
      flex-direction: column;
      gap: 2rem;

      .title {
        font-size: 2.8rem;
        font-weight: 600;
      }

      .info-box {
        display: flex;
        flex-direction: row;
        gap: 1rem;

        .link-user-image {
          display: flex;
          flex-direction: column;
          align-items: center;

          .user-image {
            width: 2.5rem;
            height: 2.5rem;
            aspect-ratio: 1;
            border-radius: 50%;
            margin: auto 0;
          }
        }

        .short-info {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;

          .user-name {
            color: $primary;
            font-size: 1.5rem;
            position: relative;

            &::after {
              content: "";
              position: absolute;
              bottom: 0;
              left: 0;
              height: 0.2rem;
              width: 0%;
              background-color: $primary;
              transition: width 0.3s ease-in-out;
            }

            &:hover {
              &::after {
                width: 100%;
              }
            }
          }
          h6 {
            font-size: 1rem;
            color: $third_80;
          }
        }

        .button {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 0.5rem;
          padding: 0.25rem 0.5rem;
          border-radius: 0.5rem;
          background-color: transparent;
          cursor: pointer;
          height: fit-content;
          transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;

          &.ml-auto {
            margin-left: auto;
          }

          &.brown {
            color: $secondary;
            border: 1px solid $secondary;

            &:hover {
              background-color: $secondary;
              color: #fff;
            }
          }

          &.gray {
            color: $third_90;
            border: 1px solid $third_90;

            &:hover {
              background-color: $third_90;
              color: #fff;
            }
          }

          &.red {
            color: red;
            border: 1px solid red;

            &:hover {
              background-color: red;
              color: #fff;
            }
          }
        }
      }
    }

    .main-post {
      display: flex;
      flex-direction: column;
      gap: 2rem;

      .description {
        font-size: 1.2rem;
        line-height: 1.8rem;
      }

      .tags-group {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;

        .tag {
          font-size: 1rem;
          color: $third_80;
          padding: 0.25rem 0.5rem;
          border-radius: 2rem;
          border: 1px solid $third_80;
        }
      }
    }

    .footer-post {
      display: flex;
      flex-direction: row;
      gap: 1rem;
    }
  }
}
</style>

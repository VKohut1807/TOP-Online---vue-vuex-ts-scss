<script setup lang="ts">
import {onMounted, computed, ComputedRef} from "vue";
import TopoLoading from "@/components/Loading.vue";
import TopoErrorMessage from "@/components/ErrorMessage.vue";
import TopoTagsList from "@/components/TagsList.vue";
import TopoAuthorInfoBox from "@/components/AuthorInfoBox.vue";

import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";

import {ModuleType} from "@/types/module-types";
import {PostActions} from "@/store/modules/post";
import {AuthGetters} from "@/store/modules/auth";
import {UserType} from "@/types/user-types";

const route = useRoute();
const router = useRouter();
const store = useStore();

const postSlug: ComputedRef<string> = computed(() => {
  const slug = route.params.slug;
  return Array.isArray(slug) ? slug[0] : slug ?? "";
});

const isLoading: ComputedRef<ModuleType["isLoading"]> = computed(() => {
  return store.state.post.isLoading;
});

const post: ComputedRef<ModuleType["data"]> = computed(() => {
  return store.state.post.data;
});

const error: ComputedRef<ModuleType["error"]> = computed(() => {
  return store.state.post.error;
});

const currentUsername: ComputedRef<UserType["username"]> = computed(() => {
  const user = store.getters[AuthGetters.currentUser];
  return user ? user.username : null;
});

const isAuthor: ComputedRef<Boolean> = computed(() => {
  if (!currentUsername.value || !post.value) return false;

  return currentUsername.value === post.value.author.username;
});

const deletePost = (): void => {
  store.dispatch(PostActions.deletePost, {slug: postSlug.value}).then(() => {
    router.push({name: "global-posts"});
  });
};

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
          <div class="row">
            <topo-author-info-box :data="post" />

            <template v-if="isAuthor">
              <router-link
                :to="{name: 'home', params: {slug: post.slug}}"
                class="button gray ml-auto"
              >
                <mdicon name="InvoiceTextEditOutline" />
                Edit Post
              </router-link>
              <button @click="deletePost" class="button red">
                <mdicon name="FileDocumentRemoveOutline" />
                Delete Post
              </button>
            </template>
          </div>
        </div>

        <div class="main-post">
          <div class="description">{{ post.body }}</div>

          <topo-tags-list :tag-list="post.tagList" />
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

      .row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 1rem;

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
    }

    .footer-post {
      display: flex;
      flex-direction: row;
      gap: 1rem;
    }
  }
}
</style>

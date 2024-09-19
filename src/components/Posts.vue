<script setup lang="ts">
import {onMounted, computed, ComputedRef, reactive, watch} from "vue";
import TopoPagination from "@/components/Pagination.vue";

import {useStore} from "vuex";
import {useRoute} from "vue-router";
import queryString from "query-string";

import {PaginationTypes} from "@/types/pagination-types";
import {PostsActions} from "@/store/modules/posts";
import {ModuleTypes} from "@/types/module-types";

const store = useStore();
const route = useRoute();

const props = defineProps({
  apiUrl: {
    type: String,
    required: true,
  },
});

const paginationParams: Pick<
  PaginationTypes,
  "limitPerPage" | "globalPostsUrl"
> = reactive({
  limitPerPage: 10,
  globalPostsUrl: "/global-posts/",
});

const currentPage: ComputedRef<PaginationTypes["currentPage"]> = computed(
  () => {
    return Number(route.query.page) || 1;
  }
);

const articlesCount: ComputedRef<PaginationTypes["articlesCount"]> = computed(
  () => {
    return store?.state?.posts?.data?.articlesCount;
  }
);

const offset: ComputedRef<PaginationTypes["offset"]> = computed(() => {
  return (
    currentPage.value * paginationParams.limitPerPage -
    paginationParams.limitPerPage
  );
});

const apiUrlWithParams: ComputedRef<string> = computed(() => {
  const parsedUrl = queryString.parseUrl(props.apiUrl);
  const stringifidParams = queryString.stringify({
    limit: paginationParams.limitPerPage,
    offset: offset.value,
    ...parsedUrl.query,
  });

  return `${parsedUrl.url}?${stringifidParams}`;
});

const isLoading: ComputedRef<ModuleTypes["isLoading"]> = computed(() => {
  return store.state.posts.isLoading;
});
const posts: ComputedRef<ModuleTypes["data"]> = computed(() => {
  return store.state.posts.data;
});
const error: ComputedRef<ModuleTypes["error"]> = computed(() => {
  return store.state.posts.error;
});

watch(currentPage, (newPage: number, oldPage: number): void => {
  if (newPage !== oldPage) fetchPosts();
});

const fetchPosts = async (): Promise<void> => {
  return await store.dispatch(PostsActions.getPosts, {
    apiUrl: apiUrlWithParams.value,
  });
};

onMounted(() => {
  fetchPosts();
});
</script>

<template>
  <div class="posts-page">
    <div v-if="isLoading" class="loading">Loading...</div>
    <div v-if="error" class="error">ERROR...</div>
    <div v-if="posts" class="posts-group">
      <div v-for="(post, index) in posts.articles" :key="index" class="post">
        <div class="top-group">
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
              <h6>{{ post.createdAt }}</h6>
            </div>
          </div>
          <div class="like">
            <mdicon v-if="post.favorited" name="HeartMultiple" />
            <mdicon v-else name="HeartMultipleOutline" />
            {{ post.favoritesCount }}
          </div>
        </div>
        <div class="main-group">
          <h3>{{ post.title }}</h3>
          <p>{{ post.description }}</p>
        </div>
        <div class="bottom-group">
          <router-link
            :to="{name: 'posts', params: {slug: post.slug}}"
            class="link-to-post"
          >
            Read more...
          </router-link>
          <div class="tag-list">
            <router-link
              v-for="(tag, idxTag) in post.tagList"
              :key="idxTag"
              :to="{name: 'tag', params: {slug: tag}}"
              class="tag"
            >
              {{ tag }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <topo-pagination
      v-if="articlesCount"
      :url="paginationParams.globalPostsUrl"
      :limit-per-page="paginationParams.limitPerPage"
      :current-page="currentPage"
      :articles-count="articlesCount"
    ></topo-pagination>
  </div>
</template>

<style scoped lang="scss">
@import "@scss/config/config.scss";

.posts-page {
  margin-top: 3rem;

  .loading {
    color: red;
  }

  .posts-group {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .post {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      background-color: $secondary_20;
      padding: 1rem;
      border-radius: 0.5rem;

      .top-group {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

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
        }

        .like {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 0.5rem;
          border: 1px solid $primary;
          padding: 0.25rem 0.5rem;
          border-radius: 2rem;
          cursor: pointer;
          font-size: 1.25rem;
          color: $primary;
        }
      }

      .main-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        h3 {
          font-size: 2rem;
        }
        p {
          font-size: 1.25rem;
          color: $third_100;
        }
      }

      .bottom-group {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .link-to-post {
          font-size: 1.25rem;
          color: $primary;
          transition: color 0.3s ease-in-out;

          &:hover {
            color: $secondary;
          }
        }

        .tag-list {
          display: flex;
          flex-direction: row;
          gap: 1rem;

          .tag {
            border: 1px solid $third_90;
            font-size: 1.1rem;
            color: $third_90;
            padding: 0.25rem 0.5rem;
            border-radius: 2rem;
            transition: background-color 0.3s ease-in-out,
              color 0.3s ease-in-out;

            &:hover {
              background-color: $third_90;
              color: #000;
            }
          }
        }
      }
    }
  }

  .error {
    color: red;
  }
}
</style>

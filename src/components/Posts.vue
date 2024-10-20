<script setup lang="ts">
import {onMounted, computed, ComputedRef, reactive, watch} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import queryString from "query-string";

import TopoPagination from "@/components/Pagination.vue";
import TopoLoading from "@/components/Loading.vue";
import TopoErrorMessage from "@/components/ErrorMessage.vue";
import TopoTagsList from "@/components/TagsList.vue";
import TopoAuthorInfoBox from "@/components/AuthorInfoBox.vue";
import TopoAddToFavorites from "@/components/AddToFavorites.vue";

import {PaginationTypes} from "@/types/pagination-types";
import {PostsActions} from "@/store/modules/posts";
import {ModuleType} from "@/types/module-types";

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

const postsCount: ComputedRef<PaginationTypes["postsCount"]> = computed(() => {
  return store?.state?.posts?.data?.articlesCount;
});

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

const isLoading: ComputedRef<ModuleType["isLoading"]> = computed(() => {
  return store.state.posts.isLoading;
});
const posts: ComputedRef<ModuleType["data"]> = computed(() => {
  return store.state.posts.data;
});
const error: ComputedRef<ModuleType["error"]> = computed(() => {
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
    <topo-loading v-if="isLoading" />

    <topo-error-message v-if="error" :error-message="error" />

    <div v-if="posts" class="posts-group">
      <div v-for="(post, index) in posts" :key="index" class="post">
        <div class="top-group">
          <topo-author-info-box :data="post" />

          <topo-add-to-favorites
            :is-favorited="post.favorited"
            :post-slug="post.slug"
            :favorites-count="post.favoritesCount"
          />
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

          <topo-tags-list :tag-list="post.tagList" :tags-links="true" />
        </div>
      </div>
    </div>
    <div v-if="!isLoading && postsCount <= 0">No posts are here... yet.</div>

    <topo-pagination
      v-if="postsCount"
      :url="paginationParams.globalPostsUrl"
      :limit-per-page="paginationParams.limitPerPage"
      :current-page="currentPage"
      :posts-count="postsCount"
    ></topo-pagination>
  </div>
</template>

<style scoped lang="scss">
@import "@scss/config/config.scss";

.posts-page {
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
        gap: 0.5rem;

        @include break("xs") {
          flex-wrap: wrap;
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
        gap: 1rem;

        .link-to-post {
          font-size: 1.25rem;
          color: $primary;
          transition: color 0.3s ease-in-out;

          &:hover {
            color: $secondary;
          }
        }
      }
    }
  }
}
</style>

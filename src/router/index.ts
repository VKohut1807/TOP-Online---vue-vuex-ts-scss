import {createRouter, createWebHistory} from "vue-router";
import Home from "@/views/Home.vue";
import Register from "@/views/Register.vue";
import Login from "@/views/Login.vue";
import GlobalPosts from "@/views/GlobalPosts.vue";
import MyFollowedPosts from "@/views/MyFollowedPosts.vue";
import TagPosts from "@/views/TagPosts.vue";
import Post from "@/views/Post.vue";
import CreatePost from "@/views/CreatePost.vue";
import EditPost from "@/views/EditPost.vue";
import {breadcrumbsConfig} from "@/data/breadcrumbs";

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        breadcrumb: breadcrumbsConfig.home,
      },
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        breadcrumb: breadcrumbsConfig.register,
      },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        breadcrumb: breadcrumbsConfig.login,
      },
    },
    {
      path: "/global-posts",
      name: "global-posts",
      component: GlobalPosts,
      meta: {
        breadcrumb: breadcrumbsConfig.globalPosts,
      },
    },
    {
      path: "/my-followed-posts",
      name: "my-followed-posts",
      component: MyFollowedPosts,
      meta: {
        breadcrumb: breadcrumbsConfig.MyFollowedPosts,
      },
    },
    {
      path: "/posts/:slug",
      name: "posts",
      component: Post,
      meta: {
        breadcrumb: breadcrumbsConfig.Post,
      },
    },
    {
      path: "/posts/new",
      name: "createPost",
      component: CreatePost,
      meta: {
        breadcrumb: breadcrumbsConfig.CreatePost,
      },
    },
    {
      path: "/posts/:slug/edit",
      name: "editPost",
      component: EditPost,
      meta: {
        breadcrumb: breadcrumbsConfig.EditPost,
      },
    },
    {
      path: "/tags/:slug",
      name: "tag",
      component: TagPosts,
      meta: {
        breadcrumb: breadcrumbsConfig.TagPosts,
      },
    },
    {
      path: "/settings",
      name: "settings",
      component: GlobalPosts,
    },
    {
      path: "/profiles/:slug",
      name: "userProfile",
      component: GlobalPosts,
    },
    {
      path: "/profiles/:slug/favorites",
      name: "userPostsFavorites",
      component: GlobalPosts,
    },
  ],
});

export default router;

import {createRouter, createWebHistory} from "vue-router";
import Home from "@/views/Home.vue";
import Register from "@/views/Register.vue";
import Login from "@/views/Login.vue";
import GlobalPosts from "@/views/GlobalPosts.vue";
import {breadcrumbsConfig} from "@/data/breadcrumbs";

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        breadcramb: breadcrumbsConfig.home,
      },
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        breadcramb: breadcrumbsConfig.register,
      },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        breadcramb: breadcrumbsConfig.login,
      },
    },
    {
      path: "/global-posts",
      name: "global-posts",
      component: GlobalPosts,
      meta: {
        breadcramb: breadcrumbsConfig.globalPosts,
      },
    },
    {
      path: "/posts/:slug",
      name: "posts",
      component: GlobalPosts,
    },
    {
      path: "/posts/new",
      name: "createPost",
      component: GlobalPosts,
    },
    {
      path: "/posts/:slug/edit",
      name: "editPost",
      component: GlobalPosts,
    },
    {
      path: "/tags/:slug",
      name: "tag",
      component: GlobalPosts,
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

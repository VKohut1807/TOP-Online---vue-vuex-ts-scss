import {createRouter, createWebHistory} from "vue-router";
import Home from "@/views/Home.vue";
import Register from "@/views/Register.vue";
import Login from "@/views/Login.vue";
import GlobalPosts from "@/views/GlobalPosts.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/global-posts",
      name: "global-posts",
      component: GlobalPosts,
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

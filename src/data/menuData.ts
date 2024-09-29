import {Ref, ref} from "vue";
import {LinksType} from "@/types/links-types";

export const navLinks: Ref<LinksType[]> = ref([
  {
    route: "home",
    title: "Home",
  },
  {
    route: "global-posts",
    title: "All Posts",
  },
]);

export const navigationDrawers: Ref<LinksType[]> = ref([
  {route: "home", title: "Dashboard", icon: "HomeCircleOutline"},
  {route: "home", title: "Images", icon: "ImageSearchOutline"},
  {route: "createPost", title: "Create Post", icon: "Post"},
  {route: "home", title: "Games", icon: "GamepadVariantOutline"},
  {route: "home", title: "Books", icon: "BookOpenVariantOutline"},
  {route: "home", title: "Notifications", icon: "BellRingOutline"},
  {route: "user-settings", title: "User Settings", icon: "CogOutline"},
]);

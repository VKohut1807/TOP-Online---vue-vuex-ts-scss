import {Breadcrumbs} from "@/types/breadcrumbs-types";

const breadcrumbHome: Breadcrumbs[] = [
  {title: "Home", path: "/", name: "home", icon: "HomeCircleOutline"},
];

export const breadcrumbsConfig: Record<string, Breadcrumbs[]> = {
  home: breadcrumbHome,
  register: [
    {title: "Home", path: "/", name: "home", icon: "HomeCircleOutline"},
    {
      title: "Register",
      path: "/register",
      name: "register",
      icon: "AccountPlusOutline",
    },
  ],
  login: [
    {title: "Home", path: "/", name: "home", icon: "HomeCircleOutline"},
    {title: "Login", path: "/login", name: "login", icon: "Login"},
  ],
  globalPosts: [
    {title: "Home", path: "/", name: "home", icon: "HomeCircleOutline"},
    {
      title: "All Posts",
      path: "/global-posts",
      name: "global-posts",
      icon: "BallotOutline",
    },
  ],
  MyFollowedPosts: [
    {title: "Home", path: "/", name: "home", icon: "HomeCircleOutline"},
    {
      title: "My Followed Posts",
      path: "/my-followed-posts",
      name: "my-followed-posts",
      icon: "AccountTagOutline",
    },
  ],
  TagPosts: [
    {title: "Home", path: "/", name: "home", icon: "HomeCircleOutline"},
    {
      title: "All Posts",
      path: "/global-posts",
      name: "global-posts",
      icon: "BallotOutline",
    },
    {
      title: "Tag: SLUG",
      path: "/tags/:slug",
      name: "tag",
      icon: "TagMultiple",
    },
  ],
};

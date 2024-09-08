import {ref, Ref} from "vue";
import {LinksType, SocialLinksType} from "@/types/links-types";

export const socialLinks: Ref<SocialLinksType[]> = ref([
  {
    route: "home",
    title: "Facebook",
    icon: "Facebook",
  },
  {
    route: "home",
    title: "Instagram",
    icon: "Instagram",
  },
  {
    route: "home",
    title: "Linkedin",
    icon: "Linkedin",
  },
  {
    route: "home",
    title: "Twitter",
    icon: "Twitter",
  },
]);

export const pageLinks: Ref<LinksType[]> = ref([
  {
    title: "Home",
    route: "home",
  },
  {
    title: "About Us",
    route: "home",
  },
  {
    title: "Team",
    route: "home",
  },
  {
    title: "Services",
    route: "home",
  },
  {
    title: "Blog",
    route: "home",
  },
  {
    title: "Contact Us",
    route: "home",
  },
]);

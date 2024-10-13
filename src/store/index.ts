import {createStore} from "vuex";
import auth from "@/store/modules/auth";
import posts from "@/store/modules/posts";
import popularTags from "@/store/modules/popularTags";
import post from "@/store/modules/post";
import userSettings from "@/store/modules/userSettings";
import addToFavorites from "@/store/modules/addToFavorites";
import userProfile from "@/store/modules/userProfile";

export default createStore({
  modules: {
    auth,
    posts,
    popularTags,
    post,
    userSettings,
    addToFavorites,
    userProfile,
  },
});

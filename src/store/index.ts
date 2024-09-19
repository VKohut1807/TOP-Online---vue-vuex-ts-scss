import {createStore} from "vuex";
import auth from "@/store/modules/auth";
import posts from "@/store/modules/posts";
import popularTags from "@/store/modules/popularTags";

export default createStore({
  modules: {auth, posts, popularTags},
});

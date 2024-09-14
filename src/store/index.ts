import {createStore} from "vuex";
import auth from "@/store/modules/auth";
import posts from "@/store/modules/posts";

export default createStore({
  modules: {auth, posts},
});

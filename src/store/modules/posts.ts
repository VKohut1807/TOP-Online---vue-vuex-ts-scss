import {MutationTree, ActionTree, ActionContext} from "vuex";
import {AxiosError} from "axios";
import postsApi from "@/api/posts";
import {ModuleType} from "@/types/module-types";

export enum PostsMutations {
  getPostsStart = "[posts] get Posts Start",
  getPostsSuccess = "[posts] get Posts Success",
  getPostsFailure = "[posts] get Posts Failure",
}

export enum PostsActions {
  getPosts = "[posts] Get Posts",
}

const state: ModuleType = {
  data: null,
  isLoading: false,
  error: null,
};

const mutations: MutationTree<ModuleType> = {
  [PostsMutations.getPostsStart](state: ModuleType) {
    state.isLoading = true;
    state.data = null;
  },
  [PostsMutations.getPostsSuccess](state: ModuleType, payload: object) {
    state.isLoading = false;
    state.data = payload;
  },
  [PostsMutations.getPostsFailure](
    state: ModuleType,
    payload: ModuleType["error"]
  ) {
    state.isLoading = false;
  },
};

const actions: ActionTree<ModuleType, object> = {
  [PostsActions.getPosts](
    {commit, state}: ActionContext<ModuleType, object>,
    {apiUrl}: {apiUrl: string}
  ) {
    return new Promise((resolve, reject) => {
      commit(PostsMutations.getPostsStart);

      postsApi
        .getPosts(apiUrl)
        .then((response) => {
          commit(PostsMutations.getPostsSuccess, response.data);

          resolve(response.data);
        })
        .catch((errors: AxiosError<{errors?: string[]}>) => {
          commit(
            PostsMutations.getPostsFailure,
            errors?.response?.data?.errors
          );

          console.log("ERRORS GET POSTS", errors?.response?.data?.errors);
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};

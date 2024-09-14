import {MutationTree, ActionTree, ActionContext} from "vuex";
import {AxiosError} from "axios";
import postsApi from "@/api/posts";
import {ModuleTypes} from "@/types/module-types";

export enum PostsMutations {
  getPostsStart = "[posts] get Posts Start",
  getPostsSuccess = "[posts] get Posts Success",
  getPostsFailure = "[posts] get Posts Failure",
}

export enum PostsActions {
  getPosts = "[posts] Get Posts",
}

const state: ModuleTypes = {
  data: null,
  isLoading: false,
  error: null,
};

const mutations: MutationTree<ModuleTypes> = {
  [PostsMutations.getPostsStart](state: ModuleTypes) {
    state.isLoading = true;
    state.data = null;
  },
  [PostsMutations.getPostsSuccess](state: ModuleTypes, payload: object) {
    state.isLoading = false;
    state.data = payload;
  },
  [PostsMutations.getPostsFailure](
    state: ModuleTypes,
    payload: ModuleTypes["error"]
  ) {
    state.isLoading = false;
  },
};

const actions: ActionTree<ModuleTypes, object> = {
  [PostsActions.getPosts](
    {commit, state}: ActionContext<ModuleTypes, object>,
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

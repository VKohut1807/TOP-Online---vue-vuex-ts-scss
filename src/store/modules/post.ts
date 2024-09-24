import {MutationTree, ActionTree, ActionContext} from "vuex";
import {AxiosError} from "axios";
import getPost from "@/api/post";
import {ModuleTypes} from "@/types/module-types";

export enum PostMutations {
  getPostStart = "[post] get Post Start",
  getPostSuccess = "[post] get Post Success",
  getPostFailure = "[post] get Post Failure",
}

export enum PostActions {
  getPost = "[post] Get Post",
}

const state: ModuleTypes = {
  data: null,
  isLoading: false,
  error: null,
};

const mutations: MutationTree<ModuleTypes> = {
  [PostMutations.getPostStart](state: ModuleTypes) {
    state.isLoading = true;
    state.data = null;
  },
  [PostMutations.getPostSuccess](state: ModuleTypes, payload: object) {
    state.isLoading = false;
    state.data = payload;
  },
  [PostMutations.getPostFailure](state: ModuleTypes) {
    state.isLoading = false;
  },
};

const actions: ActionTree<ModuleTypes, object> = {
  [PostActions.getPost](
    {commit, state}: ActionContext<ModuleTypes, object>,
    {slug}: {slug: string}
  ) {
    return new Promise((resolve, reject) => {
      commit(PostMutations.getPostStart);

      getPost
        .getPost(slug)
        .then((response) => {
          commit(PostMutations.getPostSuccess, response.data.article);

          resolve(response.data.article);
        })

        .catch((errors: AxiosError<{errors?: string[]}>) => {
          commit(PostMutations.getPostFailure, errors?.response?.data?.errors);

          console.log("ERRORS GET POST", errors?.response?.data?.errors);
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};

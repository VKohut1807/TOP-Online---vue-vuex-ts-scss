import {MutationTree, ActionTree, ActionContext} from "vuex";
import {AxiosError} from "axios";
import postApi from "@/api/post";
import {ModuleType} from "@/types/module-types";
import {error} from "console";

export enum PostMutations {
  getPostStart = "[post] get Post Start",
  getPostSuccess = "[post] get Post Success",
  getPostFailure = "[post] get Post Failure",

  createPostStart = "[post] Create Post Start",
  createPostSuccess = "[post] Create Post Success",
  createPostFailure = "[post] Create Post Failure",

  deletePostStart = "[post] delete Post Start",
  deletePostSuccess = "[post] delete Post Success",
  deletePostFailure = "[post] delete Post Failure",
}

export enum PostActions {
  getPost = "[post] Get Post",
  createPost = "[post] Create Post",
  deletePost = "[post] Delete Post",
}

const state: ModuleType = {
  data: null,
  isLoading: false,
  error: null,
  isSubmitting: false,
  validationErrors: null,
};

const mutations: MutationTree<ModuleType> = {
  [PostMutations.getPostStart](state: ModuleType) {
    state.isLoading = true;
    state.data = null;
  },
  [PostMutations.getPostSuccess](state: ModuleType, payload: object) {
    state.isLoading = false;
    state.data = payload;
  },
  [PostMutations.getPostFailure](state: ModuleType) {
    state.isLoading = false;
  },

  [PostMutations.createPostStart](state: ModuleType) {
    state.isSubmitting = true;
  },
  [PostMutations.createPostSuccess](state: ModuleType) {
    state.isSubmitting = false;
  },
  [PostMutations.createPostFailure](state: ModuleType, payload: string[]) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },

  [PostMutations.deletePostStart](state: ModuleType) {},
  [PostMutations.deletePostSuccess](state: ModuleType, payload: object) {
    state.data = null;
  },
  [PostMutations.deletePostFailure](state: ModuleType) {},
};

const actions: ActionTree<ModuleType, object> = {
  [PostActions.getPost](
    {commit, state}: ActionContext<ModuleType, object>,
    {slug}: {slug: string}
  ) {
    return new Promise((resolve, reject) => {
      commit(PostMutations.getPostStart);

      postApi
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

  [PostActions.createPost](
    {commit, state}: ActionContext<ModuleType, object>,
    {postInput}: {postInput: string}
  ) {
    return new Promise<void>((resolve, reject) => {
      commit(PostMutations.createPostStart);

      postApi
        .createPost(postInput)
        .then((response) => {
          commit(PostMutations.createPostSuccess, response.data.article);

          resolve(response.data.article);
        })

        .catch((errors: AxiosError<{errors?: string[]}>) => {
          commit(
            PostMutations.createPostFailure,
            errors?.response?.data?.errors
          );

          console.log("ERRORS CREATE POST", errors?.response?.data?.errors);
        });
    });
  },

  [PostActions.deletePost](
    {commit, state}: ActionContext<ModuleType, object>,
    {slug}: {slug: string}
  ) {
    return new Promise<void>((resolve, reject) => {
      commit(PostMutations.deletePostStart);

      postApi
        .deletePost(slug)
        .then((response) => {
          commit(PostMutations.deletePostSuccess);

          resolve();
        })

        .catch((errors: AxiosError<{errors?: string[]}>) => {
          commit(
            PostMutations.deletePostFailure,
            errors?.response?.data?.errors
          );

          console.log("ERRORS DELETE POST", errors?.response?.data?.errors);
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};

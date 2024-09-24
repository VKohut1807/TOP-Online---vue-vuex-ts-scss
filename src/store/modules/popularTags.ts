import {MutationTree, ActionTree, ActionContext} from "vuex";
import {AxiosError} from "axios";
import popularTags from "@/api/popularTags";
import {ModuleTypes} from "@/types/module-types";

export enum PopularTagsMutations {
  getPopularTagsStart = "[tags] get Popular Tags Start",
  getPopularTagsSuccess = "[tags] get Popular Tags Success",
  getPopularTagsFailure = "[tags] get Popular Tags Failure",
}

export enum PopularTagsActions {
  getPopularTags = "[tags] Get Popular Tags",
}

const state: ModuleTypes = {
  data: null,
  isLoading: false,
  error: null,
};

const mutations: MutationTree<ModuleTypes> = {
  [PopularTagsMutations.getPopularTagsStart](state: ModuleTypes) {
    state.isLoading = true;
    state.data = null;
  },
  [PopularTagsMutations.getPopularTagsSuccess](
    state: ModuleTypes,
    payload: object
  ) {
    state.isLoading = false;
    state.data = payload;
  },
  [PopularTagsMutations.getPopularTagsFailure](state: ModuleTypes) {
    state.isLoading = false;
  },
};

const actions: ActionTree<ModuleTypes, object> = {
  [PopularTagsActions.getPopularTags](
    {commit, state}: ActionContext<ModuleTypes, object>,
    {apiUrl}: {apiUrl: string}
  ) {
    return new Promise((resolve, reject) => {
      commit(PopularTagsMutations.getPopularTagsStart);

      popularTags
        .getPopularTags(apiUrl)
        .then((response) => {
          commit(
            PopularTagsMutations.getPopularTagsSuccess,
            response.data.tags
          );

          resolve(response.data.tags);
        })

        .catch((errors: AxiosError<{errors?: string[]}>) => {
          commit(
            PopularTagsMutations.getPopularTagsFailure,
            errors?.response?.data?.errors
          );

          console.log(
            "ERRORS GET POPULAR TAGS",
            errors?.response?.data?.errors
          );
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};

import {MutationTree, ActionTree, ActionContext} from "vuex";
import {AxiosError} from "axios";
import userProfileApi from "@/api/userProfile";
import {ModuleType} from "@/types/module-types";

export enum UserProfileMutations {
  getUserProfileStart = "[userProfile] Get User Profile Start",
  getUserProfileSuccess = "[userProfile] Get User Profile Success",
  getUserProfileFailure = "[userProfile] Get User Profile Failure",
}

export enum UserProfileActions {
  getUserProfileTags = "[userProfile] Get User Profile",
}

const state: ModuleType = {
  data: null,
  isLoading: false,
  error: null,
};

const mutations: MutationTree<ModuleType> = {
  [UserProfileMutations.getUserProfileStart](state: ModuleType) {
    state.isLoading = true;
    state.data = null;
  },
  [UserProfileMutations.getUserProfileSuccess](
    state: ModuleType,
    payload: object
  ) {
    state.isLoading = false;
    state.data = payload;
  },
  [UserProfileMutations.getUserProfileFailure](state: ModuleType) {
    state.isLoading = false;
  },
};

const actions: ActionTree<ModuleType, object> = {
  [UserProfileActions.getUserProfileTags](
    {commit, state}: ActionContext<ModuleType, object>,
    {slug}: {slug: string}
  ) {
    return new Promise((resolve, reject) => {
      commit(UserProfileMutations.getUserProfileStart);

      userProfileApi
        .getUserProfile(slug)
        .then((response) => {
          commit(
            UserProfileMutations.getUserProfileSuccess,
            response.data.profile
          );

          resolve(response.data.profile);
        })

        .catch((errors: AxiosError<{errors?: string[]}>) => {
          commit(
            UserProfileMutations.getUserProfileFailure,
            errors?.response?.data?.errors
          );

          console.log(
            "ERRORS GET USER PROFILE",
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

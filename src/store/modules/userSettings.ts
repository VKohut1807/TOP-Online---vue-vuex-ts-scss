import {MutationTree, ActionTree, ActionContext} from "vuex";
import {AuthMutations} from "@/store/modules/auth";
import {AuthTypes} from "@/types/auth-types";
import {ExtendedUserType} from "@/types/user-types";

const state: Pick<AuthTypes, "isSubmitting" | "validationErrors"> = {
  isSubmitting: false,
  validationErrors: null,
};

const mutations: MutationTree<AuthTypes> = {
  [AuthMutations.updateCurrentUserStart](state: AuthTypes) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [AuthMutations.updateCurrentUserSuccess](
    state: AuthTypes,
    payload: ExtendedUserType
  ) {
    state.isSubmitting = false;
  },
  [AuthMutations.updateCurrentUserFailure](
    state: AuthTypes,
    payload: string[]
  ) {
    state.validationErrors = payload;
  },
};

export default {
  state,
  mutations,
};

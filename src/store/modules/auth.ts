import {MutationTree, ActionTree, ActionContext} from "vuex";
import {AxiosError} from "axios";
import authApi from "@/api/auth";
import {AuthTypes} from "@/types/auth-types";
import {UserType, ExtendedUserType} from "@/types/user-types";
import {setItem} from "@/helpers/persistanceStorage";

export enum AuthMutations {
  registerStart = "[auth] registerStart",
  registerSuccess = "[auth] registerSuccess",
  registerFailure = "[auth] registerFailure",

  loginStart = "[auth] loginStart",
  loginSuccess = "[auth] loginSuccess",
  loginFailure = "[auth] loginFailure",
}

export enum AuthActions {
  register = "[auth] register",
  login = "[auth] login",
}

const state: AuthTypes = {
  isSubmitting: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
};

const mutations: MutationTree<AuthTypes> = {
  [AuthMutations.registerStart](state: AuthTypes) {
    state.isSubmitting = true;
    state.validationErrors = null;
    state.isLoggedIn = null;
  },
  [AuthMutations.registerSuccess](state: AuthTypes, payload: ExtendedUserType) {
    state.isSubmitting = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  [AuthMutations.registerFailure](
    state: AuthTypes,
    payload: AuthTypes["validationErrors"]
  ) {
    state.isSubmitting = false;
    state.validationErrors = payload;
    state.isLoggedIn = false;
  },

  [AuthMutations.loginStart](state: AuthTypes) {
    state.isSubmitting = true;
    state.validationErrors = null;
    state.isLoggedIn = null;
  },
  [AuthMutations.loginSuccess](state: AuthTypes, payload: UserType) {
    state.isSubmitting = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  [AuthMutations.loginFailure](state: AuthTypes, payload: string[]) {
    state.isSubmitting = false;
    state.validationErrors = payload;
    state.isLoggedIn = false;
  },
};

const actions: ActionTree<AuthTypes, any> = {
  [AuthActions.register](
    {commit, state}: ActionContext<AuthTypes, any>,
    credentials: UserType
  ) {
    return new Promise((resolve, reject) => {
      commit(AuthMutations.registerStart);

      authApi
        .register(credentials)
        .then((response) => {
          commit(AuthMutations.registerSuccess, response.data.user);

          setItem("accessToken", response.data.user.token);

          resolve(response.data.user);
        })
        .catch((errors: AxiosError<{errors?: string[]}>) => {
          commit(AuthMutations.registerFailure, errors?.response?.data?.errors);

          console.log("ERRORS REGISTER", errors?.response?.data?.errors);
        });
    });
  },

  [AuthActions.login](
    {commit, state}: ActionContext<AuthTypes, any>,
    credentials: UserType
  ) {
    return new Promise((resolve, reject) => {
      commit(AuthMutations.loginStart);

      authApi
        .login(credentials)
        .then((response) => {
          commit(AuthMutations.loginSuccess, response.data.user);

          setItem("accessToken", response.data.user.token);

          resolve(response.data.user);
        })
        .catch((error: AxiosError<{errors?: string[]}>) => {
          commit(AuthMutations.loginFailure, error?.response?.data?.errors);

          console.log("ERRORS LOGIN", error?.response?.data?.errors);
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};

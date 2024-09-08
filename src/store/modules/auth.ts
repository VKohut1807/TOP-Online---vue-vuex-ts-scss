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

  getCurrentUserStart = "[auth] getCurrentUserStart",
  getCurrentUserSuccess = "[auth] getCurrentUserSuccess",
  getCurrentUserFailure = "[auth] getCurrentUserFailure",
}

export enum AuthActions {
  register = "[auth] register",
  login = "[auth] login",
  getCurrentUser = "[auth] getCurrentUser",
}

export enum AuthGetters {
  currentUser = "[auth] currentUser",
  isLoggedIn = "[auth] isLoggedIn",
  isAnonymous = "[auth] isAnonymous",
}

const state: AuthTypes = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
};

const getters = {
  [AuthGetters.currentUser]: (state: AuthTypes) => {
    return state.currentUser;
  },
  [AuthGetters.isLoggedIn]: (state: AuthTypes) => {
    return Boolean(state.isLoggedIn);
  },
  [AuthGetters.isAnonymous]: (state: AuthTypes) => {
    return state.isLoggedIn === false;
  },
};

const mutations: MutationTree<AuthTypes> = {
  [AuthMutations.registerStart](state: AuthTypes) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [AuthMutations.registerSuccess](state: AuthTypes, payload: ExtendedUserType) {
    state.isSubmitting = false;
    state.isLoggedIn = true;
    state.currentUser = payload;
  },
  [AuthMutations.registerFailure](
    state: AuthTypes,
    payload: AuthTypes["validationErrors"]
  ) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },

  [AuthMutations.loginStart](state: AuthTypes) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [AuthMutations.loginSuccess](state: AuthTypes, payload: UserType) {
    state.isSubmitting = false;
    state.isLoggedIn = true;
    state.currentUser = payload;
  },
  [AuthMutations.loginFailure](state: AuthTypes, payload: string[]) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },

  [AuthMutations.getCurrentUserStart](state: AuthTypes) {
    state.isLoading = true;
  },
  [AuthMutations.getCurrentUserSuccess](
    state: AuthTypes,
    payload: ExtendedUserType
  ) {
    state.isLoading = false;
    state.isLoggedIn = true;
    state.currentUser = payload;
  },
  [AuthMutations.getCurrentUserFailure](state: AuthTypes) {
    state.isLoading = false;
    state.isLoggedIn = false;
    state.currentUser = null;
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

  [AuthActions.getCurrentUser](
    {commit, state}: ActionContext<AuthTypes, any>,
    credentials: UserType
  ) {
    return new Promise((resolve, reject) => {
      commit(AuthMutations.getCurrentUserStart);

      authApi
        .getCurrentUser()
        .then((response) => {
          commit(AuthMutations.getCurrentUserSuccess, response.data.user);

          resolve(response.data.user);
        })
        .catch((error: AxiosError<{errors?: string[]}>) => {
          commit(
            AuthMutations.getCurrentUserFailure,
            error?.response?.data?.errors
          );

          console.log("ERRORS LOGIN", error?.response?.data?.errors);
        });
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};

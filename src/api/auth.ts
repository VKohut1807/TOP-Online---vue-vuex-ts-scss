import axios from "@/api/axios";
import {baseURL} from "@/data/baseURL";
import {UserType, ExtendedUserType} from "@/types/user-types";

const register = (credentials: UserType) => {
  return axios.post(`${baseURL["conduit"]}/users`, {user: credentials});
};

const login = (credentials: UserType) => {
  return axios.post(`${baseURL["realworld"]}/users/login`, {
    user: credentials,
  });
};

const getCurrentUser = () => {
  return axios.get(`${baseURL["realworld"]}/user`);
};

const updateCurrentUser = (currentUserInput: ExtendedUserType) => {
  return axios.put(`${baseURL["realworld"]}/user`, {
    user: currentUserInput,
  });
};

export default {
  register,
  login,
  getCurrentUser,
  updateCurrentUser,
};

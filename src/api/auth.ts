import axios from "@/api/axios";
import {baseURL} from "@/data/baseURL";
import {UserType} from "@/types/user-types";

const register = (credentials: UserType) => {
  return axios.post(`${baseURL["login-register"]}/users`, {user: credentials});
};

const login = (credentials: UserType) => {
  return axios.post(`${baseURL["login-register"]}/users/login`, {
    user: credentials,
  });
};

const getCurrentUser = () => {
  return axios.get(`${baseURL["get-current-user"]}/user`);
};

export default {
  register,
  login,
  getCurrentUser,
};

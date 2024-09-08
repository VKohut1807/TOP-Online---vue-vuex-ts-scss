import axios from "@/api/axios";
import {UserType} from "@/types/user-types";

const register = (credentials: UserType) => {
  return axios.post("/users", {user: credentials});
};

const login = (credentials: UserType) => {
  return axios.post("/users/login", {user: credentials});
};

export default {
  register,
  login,
};

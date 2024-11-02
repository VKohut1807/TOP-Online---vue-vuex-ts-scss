import axios from "@/api/axios";
import {UserType, ExtendedUserType} from "@/types/user-types";

const register = (credentials: UserType) => {
  return axios.post("/api/user/register", {user: credentials});
};

const login = (credentials: UserType) => {
  return axios.post("/api/user/login", {
    user: credentials,
  });
};

const getCurrentUser = () => {
  return axios.get(`/api/user`);
};

const updateCurrentUser = (currentUserInput: ExtendedUserType) => {
  return axios.put("/api/user", {
    user: currentUserInput,
  });
};

export default {
  register,
  login,
  getCurrentUser,
  updateCurrentUser,
};

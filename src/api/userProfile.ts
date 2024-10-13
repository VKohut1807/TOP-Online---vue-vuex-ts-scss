import axios from "@/api/axios";
import {baseURL} from "@/data/baseURL";

const getUserProfile = (slug: string) => {
  return axios.get(`${baseURL["realworld"]}/profiles/${slug}`);
};

export default {
  getUserProfile,
};

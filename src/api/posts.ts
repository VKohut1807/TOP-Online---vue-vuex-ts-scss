import axios from "@/api/axios";

const getPosts = (apiUrl: string) => {
  return axios.get(apiUrl);
};

export default {
  getPosts,
};

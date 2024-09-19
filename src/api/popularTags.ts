import axios from "@/api/axios";

const getPopularTags = (apiUrl: string) => {
  return axios.get(apiUrl);
};

export default {
  getPopularTags,
};

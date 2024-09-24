import axios from "@/api/axios";
import {baseURL} from "@/data/baseURL";

const getPost = (slug: string) => {
  return axios.get(`${baseURL["post"]}/articles/${slug}`);
};

export default {
  getPost,
};

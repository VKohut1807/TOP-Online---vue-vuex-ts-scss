import axios from "@/api/axios";
import {baseURL} from "@/data/baseURL";

const addToFavorites = (slug: string) => {
  return axios.post(`/api/posts/${slug}/favorite`);
};
const deleteFromFavorites = (slug: string) => {
  return axios.delete(`/api/posts/${slug}/favorite`);
};

export default {
  addToFavorites,
  deleteFromFavorites,
};

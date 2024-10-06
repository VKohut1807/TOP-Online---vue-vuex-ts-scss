import axios from "@/api/axios";
import {baseURL} from "@/data/baseURL";

const addToFavorites = (slug: string) => {
  return axios.post(`${baseURL["realworld"]}/articles/${slug}/favorite`);
};
const deleteFromFavorites = (slug: string) => {
  return axios.delete(`${baseURL["realworld"]}/articles/${slug}/favorite`);
};

export default {
  addToFavorites,
  deleteFromFavorites,
};

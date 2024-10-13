import axios from "@/api/axios";
import {baseURL} from "@/data/baseURL";

const getPost = (slug: string) => {
  return axios.get(`/api/articles/${slug}`);
};

const createPost = (postInput: string) => {
  return axios.post(`/api/articles`, {article: postInput});
};

const updatePost = (slug: string, postInput: string) => {
  return axios.put(`/api/articles/${slug}`, {
    article: postInput,
  });
};

const deletePost = (slug: string) => {
  return axios.delete(`/api/articles/${slug}`);
};

export default {
  getPost,
  createPost,
  updatePost,
  deletePost,
};

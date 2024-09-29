import axios from "@/api/axios";
import {baseURL} from "@/data/baseURL";

const getPost = (slug: string) => {
  return axios.get(`${baseURL["realworld"]}/articles/${slug}`);
};

const createPost = (postInput: string) => {
  return axios.post(`${baseURL["realworld"]}/articles`, {article: postInput});
};

const updatePost = (slug: string, postInput: string) => {
  return axios.put(`${baseURL["realworld"]}/articles/${slug}`, {
    article: postInput,
  });
};

const deletePost = (slug: string) => {
  return axios.delete(`${baseURL["realworld"]}/articles/${slug}`);
};

export default {
  getPost,
  createPost,
  updatePost,
  deletePost,
};

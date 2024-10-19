import axios from "@/api/axios";

const getPost = (slug: string) => {
  return axios.get(`/api/posts/${slug}`);
};

const createPost = (postInput: string) => {
  return axios.post(`/api/posts/create`, {post: postInput});
};

const updatePost = (slug: string, postInput: string) => {
  return axios.put(`/api/posts/${slug}`, {
    post: postInput,
  });
};

const deletePost = (slug: string) => {
  return axios.delete(`/api/posts/${slug}`);
};

export default {
  getPost,
  createPost,
  updatePost,
  deletePost,
};

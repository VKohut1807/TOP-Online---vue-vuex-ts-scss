import axios from "axios";
import {getItem} from "@/helpers/persistanceStorage";

axios.interceptors.request.use((config) => {
  const token = getItem("accessToken");

  const authorizisationToken = token ? `${token}` : "";

  config.headers.Authorization = authorizisationToken;

  return config;
});

export default axios;

import { API_USERS } from "@/config";
import axios from "axios";

export const axiosApiUsers = axios.create({});
axiosApiUsers.interceptors.request.use(
  async function (config) {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = token;
    }
    config.headers["Content-Type"] = "application/json";
    config.baseURL = API_USERS;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
axiosApiUsers.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

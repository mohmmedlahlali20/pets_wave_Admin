import axios from "axios";
import Cookies from "js-cookie";

const path = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_API,
});

path.interceptors.request.use(
  function (config) {
    const token = Cookies.get("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  function (err) {
    console.error("Axios Request Error:", err);
    return Promise.reject(err);
  }
);

export default path;

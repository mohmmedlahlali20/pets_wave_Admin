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
      let hasFile = false;
      for (const value of config.data.values()) {
        if (value instanceof File || (value instanceof Blob && value.type)) {
          hasFile = true;
          break;
        }
      }

      if (hasFile) {
        config.headers["Content-Type"] = "multipart/form-data";
      } else {
        config.headers["Content-Type"] = "application/json";
      }
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

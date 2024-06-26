import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:1337/api",
  withCredentials: true
});

// Add a request interceptor to set the Authorization header dynamically
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token-strapi");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      const error = {
        error: "No response from the server, please try again later",
      };
      const data = { response: { data: error } };
      return Promise.reject(data);
    }
    return Promise.reject(error);
  }
);

export default request;

import axios from "axios";

const api = axios.create({
  baseURL: "https://celcius-dev.onrender.com/api", // Backend adresin
});

// Her istek gönderilmeden önce araya gir:
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

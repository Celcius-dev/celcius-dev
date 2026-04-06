import axios from "axios";

// Mantık şu:
// Eğer Vercel'de tanımlı bir VITE_BACKEND_URL varsa onu kullan.
// Yoksa (yani bilgisayarında çalışıyorsan) localhost'u kullan.
const BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

// Upload URL'sini de buradan dışarı açıyoruz ki her yerde aynısı kullanılsın
export const UPLOAD_URL = BASE_URL.replace("/api", "") + "/uploads/";

const api = axios.create({
  baseURL: BASE_URL,
});

// Interceptor to add the token to every request if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

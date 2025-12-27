import axios from "axios";

// Mantık şu:
// Eğer Vercel'de tanımlı bir VITE_BACKEND_URL varsa onu kullan.
// Yoksa (yani bilgisayarında çalışıyorsan) localhost'u kullan.
const BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;

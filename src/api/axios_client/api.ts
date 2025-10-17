import { authStore } from "@/store/authStore";
import axios from "axios";


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

// Interceptor para requests → agrega accessToken
api.interceptors.request.use((config) => {
  const { accessToken } = authStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Interceptor para responses → maneja 401 y refresca
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // si es 401 y no intentamos refrescar todavía
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newAccessToken = await authStore.getState().refreshAccessToken();

      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest); // reintenta request con el nuevo token
      } else {
        authStore.getState().logout(); // si falla, forzar logout
      }
    }

    return Promise.reject(error);
  }
);

export default api;

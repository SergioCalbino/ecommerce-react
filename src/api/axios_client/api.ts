
import { authStore } from "@/store/authStore";
import axios from "axios";



const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use((config) => {
  const token = authStore.getState().token;
  const accessToken = authStore.getState().accessToken;
  const authToken = accessToken || token;

  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }

  console.log("👉 Request:", {
    url: config.url,
    method: config.method,
    headers: config.headers,
    data: config.data
  });

  return config;
});


export default api
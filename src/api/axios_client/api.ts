
import { authStore } from "@/store/authStore";
import axios from "axios";



const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use((config) => {
    const token = authStore.getState().token;
    const accessToken = authStore.getState().accessToken
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config;
});

export default api
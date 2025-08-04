import type { UserLoginForm, UserRegistrationForm } from "@/schemas/auth.schema";

import api from "./axios_client/api";





export async function createAccount(formData: UserRegistrationForm) {
    
       const { data } = await api.post("/api/auth/register", formData)
        console.log(data)
        return data
}

export async function loginAccount(formData: UserLoginForm) {
        const { data } = await api.post("/api/auth/login", formData)
        console.log(data);
        return data
        
        
}
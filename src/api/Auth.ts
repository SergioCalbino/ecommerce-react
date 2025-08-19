import type { RecoveryPassword, ResetPasswordUser, UserLoginForm, UserRegistrationForm } from "@/schemas/auth.schema";

import api from "./axios_client/api";
import type { CustomerUpdate } from "@/schemas/customer.schema";


interface NewPasswordAndResetTokenDto {
        token: string | null,
        password: string
}



export async function createAccount(formData: UserRegistrationForm) {
        const { data } = await api.post("/api/auth/register", formData)
        return data
}

export async function loginAccount(formData: UserLoginForm) {
        const { data } = await api.post("/api/auth/login", formData)
        return data
}

export async function sendEmailToRecoveryPassword(formData: RecoveryPassword) {
        const { data } = await api.post("/api/auth/forgot", formData)
        console.log(data);
        return data
        
}

export async function sendResetPassword(formData:NewPasswordAndResetTokenDto) {
        const { data } = await api.post("/api/auth/reset", formData)
        return data;
        
}

export async function myProfile() {
        const { data } = await api.get("/api/customer/my-profile")
        return data;
        
}

export async function updateProfile(formData: CustomerUpdate) {
        const { data } = await api.post("/api/customer/update", formData)
        return data; 
        
}
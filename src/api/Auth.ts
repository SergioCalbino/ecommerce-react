import type { RecoveryPassword, ResetPasswordUser, UserLoginForm, UserRegistrationForm } from "@/schemas/auth.schema";

import api from "./axios_client/api";


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
import { z } from 'zod'

const authSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    address: z.string(),
    password: z.string(),
    telephone: z.string(),
    password_confirmation: z.string()

})

type Auth = z.infer<typeof authSchema>
export type UserLoginForm = Pick<Auth, 'email' | 'password'>
export type UserRegistrationForm = Pick<Auth, 'name' | 'email' | 'address' | 'password' | 'telephone' | 'password_confirmation'>
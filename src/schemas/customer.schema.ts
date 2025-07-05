import { z } from 'zod';
import { orderBaseSchema } from './order.schema';


export const customerSchema = z.object({
    id: z.number().int().positive(),
    name: z.string(),
    email: z.string().email(),
    password: z.string().optional(),
    address: z.string().optional(),
    orders: orderBaseSchema.array().optional(),
    telephone: z.string().optional()

})

//Este schema es para el checkout
export const checkoutStepOneSchema = customerSchema.pick({
    name: true,
    email: true,
    telephone: true,
    address: true
})


export type Customer = z.infer<typeof customerSchema>;
export type CheckOutStepOne = z.infer<typeof checkoutStepOneSchema>





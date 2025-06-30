import { z } from 'zod';
import { orderBaseSchema } from './order.schema';


export const customerSchema = z.object({
    id: z.number().int().positive(),
    name: z.string(),
    email: z.string().email(),
    password: z.string().optional(),
    address: z.string().optional(),
    orders: orderBaseSchema.array().optional(),

})



export type Customer = z.infer<typeof customerSchema>;




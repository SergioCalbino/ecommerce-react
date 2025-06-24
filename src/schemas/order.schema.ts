import { z } from 'zod';
import { customerSchema } from './customer.schema';

export const orderItemSchema = z.object({
    id: z.number().int().positive(),
    productId: z.number().int().positive(),
    quantity: z.number().int().positive(),
    price: z.number().nonnegative(),
})

export const orderBaseSchema = z.object({
    id: z.number().int().positive(),
    date: z.date(),
    orderItems: z.array(orderItemSchema),
    total: z.number().nonnegative(),
    state: z.enum(['PENDING', 'SHIPPED', 'DELIVERED', 'CANCELLED']),

})

export const orderSchema = orderBaseSchema.extend({
    customer: customerSchema,
});

export type OrderItem = z.infer<typeof orderItemSchema>;
export type Order = z.infer<typeof orderSchema>;

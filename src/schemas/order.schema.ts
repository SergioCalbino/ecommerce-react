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

//Schema para enviar a la api de order

export const orderSchemaDto = z.object({
    date: z.date(),
    customerDto: customerSchema.pick({email: true}),
    state: z.enum(["PENDING", "PAID", "DELIVERED", "CANCELLED"]).optional()
})


//Esto es para el paso 2 del checkout
export const checkoutStepTwoSchema = z.object({
    cardNumber: z.string().min(13).max(19), 
    expiration: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/), 
    cvc: z.string().min(3).max(4),
    cardName: z.string()
});

export type OrderItem = z.infer<typeof orderItemSchema>;
export type Order = z.infer<typeof orderSchema>;

//
export type CheckoutStepTwo = z.infer<typeof checkoutStepTwoSchema>

//Type para la api de order
export type OrderDto = z.infer<typeof orderSchemaDto>

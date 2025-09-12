import { z } from 'zod';
import { customerSchema } from './customer.schema';
import { productSchema } from './product.schema';

export const orderItemSchema = z.object({
    id: z.number().int().positive().optional(),
    productId: z.number().int().positive(),
    quantity: z.number().int().positive(),
    unitPrice: z.number().nonnegative(),
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
    customerDto: customerSchema,
    orderItemDto: orderItemSchema.array(),
    total: z.number().nonnegative(),
    state: z.enum(["PENDING", "PAID", "DELIVERED", "CANCELLED"]).optional()
})


//Esto es para el paso 2 del checkout
export const checkoutStepTwoSchema = z.object({
    cardNumber: z.string().min(13).max(19), 
    expiration: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/), 
    cvc: z.string().min(3).max(4),
    cardName: z.string()
});

export const orderStoreSchema = z.object({
    id: z.number().int().positive().optional(),
    quantity: z.number().int().positive(),
    subtotal: z.number().nonnegative(),
    unitPrice: z.number().nonnegative(),
})

export const orderItemResponseSchema = z.object({
    id: z.number().int().positive(),
    orderId: z.number().int().positive(),
    productResponseDto: productSchema,
    quantity: z.number().int().positive(),
    unitPrice: z.number().nonnegative(),
    subtotal: z.number().nonnegative(),
})

export const orderResponseSchema = z.object({
    id: z.number().int().positive(),
    customerId: z.number().int().positive(),
    customerResponseDto: customerSchema,
    date: z.string(),
    orderItemResponseDto: z.array(orderItemResponseSchema),
    total: z.number().nonnegative(),
    state: z.enum(['PENDING', 'SHIPPED', 'DELIVERED', 'CANCELLED']),
})



export type OrderItem = z.infer<typeof orderItemSchema>;
export type Order = z.infer<typeof orderSchema>;

//
export type CheckoutStepTwo = z.infer<typeof checkoutStepTwoSchema>

//Type para la api de order
export type OrderDto = z.infer<typeof orderSchemaDto>

export type OrderResponse = z.infer<typeof orderResponseSchema>;
export type OrderItemResponse = z.infer<typeof orderItemResponseSchema>;
export type ProductResponse = z.infer<typeof productSchema>;



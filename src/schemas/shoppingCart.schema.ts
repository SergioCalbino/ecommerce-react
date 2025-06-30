
import { z } from 'zod';
import { productSchema } from './product.schema';
import { customerSchema } from './customer.schema';

export const cartItemSchema = z.object({
    id: z.number().int().positive().optional(),
    quantity: z.number().int().positive(),
    product: productSchema,
    subTotal: z.number().positive()
})

export const shoppingCartSchema = z.object({
    items: z.array(cartItemSchema),
    customer: customerSchema,
    cartItems: cartItemSchema.array(),
    total: z.number().nonnegative(),
});

export const shoppingCartDtoSchema = z.object({
    customerDto: z.object({
        customer_id: z.number().int().positive(),
        email: z.string().email(),
    }),
    productDto: z.object({
        id: z.number().positive()
    }),
    quantity: z.number().positive()
})

export type Cartitem = z.infer<typeof cartItemSchema>;
export type ShoppingCart = z.infer<typeof shoppingCartSchema>;
export type ShoppingCartDto = z.infer<typeof shoppingCartDtoSchema>;
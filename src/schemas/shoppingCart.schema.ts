
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

export type Cartitem = z.infer<typeof cartItemSchema>;
export type ShoppingCart = z.infer<typeof shoppingCartSchema>;
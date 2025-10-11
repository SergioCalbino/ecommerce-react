import { z } from 'zod';

export const productSchema = z.object({
    id: z.number().int().positive(),
    name: z.string(),
    price: z.number().positive(),
    description: z.string().optional(),
    image: z.string().optional(),
    stock: z.number().int().nonnegative(),
    categoryId: z.number().int().positive(),
    categoryName: z.string().optional(),
});

export const productPageSchema = z.object({
    content: z.array(productSchema),
    totalElements: z.number().int().nonnegative(),
    last: z.boolean(),
    first: z.boolean(),
    size: z.number().int().positive(),
    number: z.number().int().nonnegative(),
    numberOfElements: z.number().int().nonnegative(),
    sort: z.object({
        empty: z.boolean(),
        sorted: z.boolean(),
        unsorted: z.boolean(),
    }),
    empty: z.boolean(),
    totalPages: z.number().int().nonnegative(),
   
})




export type Product = z.infer<typeof productSchema>;
export type ProductPage = z.infer<typeof productPageSchema>;
export type CreateProductForm = Pick<Product, 'description' | 'name' | 'price' | 'stock' | 'image' | 'categoryId'>
export type UpdateProductForm =  Pick<Product, 'description' | 'name' | 'price' | 'stock' | 'image' | 'categoryId'>


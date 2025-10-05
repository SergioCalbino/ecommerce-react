import { z } from "zod";
import { productSchema } from "./product.schema";

 

 export const categorySchema = z.object({
    id: z.number().int().positive(),
    name: z.string().min(2).max(50),
    description: z.string().max(255).optional(),
    productResponseDtoList: z.array(productSchema)

 })

 export type Category = z.infer<typeof categorySchema>;
 export type CategoryCreate = Pick<Category, 'name'>
import { productPageSchema } from "@/schemas/product.schema";
import api from "./axios_client/api";



export async function getProducts(page: number = 0, size: number = 8) {
  
                const response = await api.get(`/api/products?page=${page}&size=${size}`);
                console.log(response)
                return productPageSchema.parse((response).data)
            
    
}
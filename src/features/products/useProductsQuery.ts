import { productPageSchema } from '@/schemas/product.schema'
import type { ProductPage } from '@/schemas/product.schema'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'


const useProductsQuery = (page: number = 0, size: number = 8) => {
    return useQuery<ProductPage>({
        queryKey: ['products', page],
            queryFn: async() => {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${page}&size=${size}&sort=price&direction=DESC`)
                return productPageSchema.parse((response).data)
            }
        })
}

export default useProductsQuery

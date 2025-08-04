import api from '@/api/axios_client/api'
import { productPageSchema } from '@/schemas/product.schema'
import type { ProductPage } from '@/schemas/product.schema'
import { useAuthStore } from '@/store/useAuthStore'
import { useQuery } from '@tanstack/react-query'



const useProductsQuery = (page: number = 0, size: number = 8) => {

    const token = useAuthStore.getState().token
    console.log(token)

    return useQuery<ProductPage>({
        queryKey: ['products', page],
            queryFn: async() => {
                const response = await api.get(`/api/products?page=${page}&size=${size}`);
                console.log(response)
                return productPageSchema.parse((response).data)
            }
        })
}

export default useProductsQuery

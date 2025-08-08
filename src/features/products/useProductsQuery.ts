
import { getProducts } from '@/api/Products'
import type { ProductPage } from '@/schemas/product.schema'
import { useAuthStore } from '@/store/useAuthStore'
import { useQuery } from '@tanstack/react-query'



const useProductsQuery = (page: number = 0, size: number = 8) => {

    const token = useAuthStore.getState().token
    console.log(token)

    return useQuery<ProductPage>({
        queryKey: ['products', page],
            queryFn: ()=> getProducts(page, size)
        })
}

export default useProductsQuery

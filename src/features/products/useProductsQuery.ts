
import { getProducts } from '@/api/Products'
import type { ProductPage } from '@/schemas/product.schema'
import { useQuery } from '@tanstack/react-query'



const useProductsQuery = (page: number = 0, size: number = 8) => {


    return useQuery<ProductPage>({
        queryKey: ['products', page],
            queryFn: ()=> getProducts(page, size)
        })
}

export default useProductsQuery

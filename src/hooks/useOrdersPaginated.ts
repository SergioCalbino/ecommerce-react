import { getOrdersPageable } from "@/api/order"
import { useQuery } from "@tanstack/react-query"



const useOrdersPaginated = (page: number, size: number) => {

    const { data, error, isLoading } = useQuery({
        queryKey: ['ordersPaginated', page, size],
        queryFn: () => getOrdersPageable(page, size) 
    })

    return { data, error, isLoading }
}

export default useOrdersPaginated
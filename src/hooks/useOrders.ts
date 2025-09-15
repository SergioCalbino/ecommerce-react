import { getOrders } from "@/api/order"
import { useQuery } from "@tanstack/react-query"


const useOrders = () => {

    const { data, error, isLoading } =  useQuery({
        queryKey: ['orders'],
        queryFn: getOrders
    })

    return { data, error, isLoading }
}

export default useOrders
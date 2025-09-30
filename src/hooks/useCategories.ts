import { getCategories } from "@/api/categories"
import { useQuery } from "@tanstack/react-query"


const useGetCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: getCategories
    })
  
}

export default useGetCategories
 
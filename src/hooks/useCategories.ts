import { create, getCategories } from "@/api/categories"
import { categorySchema, type CategoryCreate } from "@/schemas/category.schema"
import { useMutation, useQuery } from "@tanstack/react-query"
import type { AxiosError } from "axios"
import { toast } from "react-toastify"


const useGetCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: getCategories
    })
  
}

const useCreateCategory = () => {
    return useMutation({
        mutationFn: (formData: CategoryCreate) => create(formData),
        onError: (error: AxiosError<{message?: Record<string, string>}>) => {
            const data = error.response?.data
            if (data?.message && typeof data.message === 'object') {
                Object.values(data.message).forEach(msg => {
                    toast.error(msg)
                })
                 
            } else {
                toast.error('Error desconocido')
            }
        },
        onSuccess: (data) => {
            toast.success('Categoria creadada de forma correcta')
            return data
        }
    })

}



export {

useGetCategories,
useCreateCategory
}
 
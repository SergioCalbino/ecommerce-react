import type { CategoryCreate } from "@/schemas/category.schema";
import api from "./axios_client/api";


export async function getCategories() {
    try {
        const response = await api.get('/api/categories')
        return response.data
        
    } catch (error) {
        console.log(error)
        throw error
        
    }

    
}

export async function create(formData: CategoryCreate) {
    try {
        const response = await api.post('api/categories', formData)
        return response.data
        
    } catch (error) {
        console.log(error)
        throw error
    }
}
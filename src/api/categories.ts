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
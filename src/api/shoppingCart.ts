import type { ShoppingCartDto } from "@/schemas/shoppingCart.schema"
import api from "./axios_client/api"


export const postShoppingCart = async (shoppingCart: ShoppingCartDto) => {
    try {
        const { data } = await api.post(`${import.meta.env.VITE_API_URL}/shopping-cart/cart-item?`, shoppingCart)
        console.log(data)
        return data
        
    } catch (error) {
        console.log(error)
        
    }
}
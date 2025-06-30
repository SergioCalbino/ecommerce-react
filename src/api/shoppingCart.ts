import type { ShoppingCartDto } from "@/schemas/shoppingCart.schema"
import axios from "axios"


export const postShoppingCart = async (shoppingCart: ShoppingCartDto) => {
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/shopping-cart/cart-item?`, shoppingCart)
        console.log(data)
        return data
        
    } catch (error) {
        console.log(error)
        
    }
}
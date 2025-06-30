import type { Product } from "@/schemas/product.schema"
import type { Cartitem } from "@/schemas/shoppingCart.schema"




export const validateStock = (items: Cartitem[], product: Product) => {
    const existingItem = items.find((item) => item.product.id === product.id)
    const quantityInCart = existingItem?.quantity ?? 0
    const availableStock = product.stock - quantityInCart
    return availableStock <= 0
    

}
export const getAvailableStock = (items: Cartitem[], product: Product): number => {
    const existingItem = items.find((item) => item.product.id === product.id)
    const quantityInCart = existingItem?.quantity ?? 0
    return product.stock - quantityInCart

}
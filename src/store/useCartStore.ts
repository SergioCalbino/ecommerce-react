
import type { Cartitem } from '@/schemas/shoppingCart.schema';
import { create } from 'zustand';

interface CartState {
    items: Cartitem[],
    addToCart: (item: Cartitem) => void,
    decreaseQuantity: (item: Cartitem) => void,
    remove: (id: number) => void,
    clearCart: () => void,
    total: number 
}


export const useCartStore = create<CartState>((set) => ({
    items: [],
    total: 0,
    addToCart: (item) => set((state) => {
        const exist = state.items.find((i) => i.product.id === item.product.id);
        if(exist) {
            return {
                ...state,
                items: state.items.map((i) => (
                    i.product.id === item.product.id 
                    ? { ...i, quantity: i.quantity + item.quantity }
                    : i
                )),
                total: state.total + (item.product.price * item.quantity)

            }
        } else {
            return {
                ...state,
                items: [...state.items, item ],
                total: state.total + (item.product.price * item.quantity)
            }
        }
    }),
    decreaseQuantity: (item) => set((state) => {
        const exist = state.items.find((i) => i.product.id === item.product.id)
        if (!exist) return state
        
        const newQuantity = exist.quantity - item.quantity

        if (newQuantity > 0) {
            return {
                ...state,
                items: state.items.map((i) => (
                    i.product.id === item.product.id
                    ? { ...i, quantity: i.quantity - item.quantity }
                    : i
                )),
                total: state.total - (item.product.price * item.quantity)
            }
        } else {
            const updatedItems = state.items.filter((i) => i.product.id !== item.product.id)
            return {
                ...state,
                items: updatedItems,
                total: state.total - (exist.product.price * exist.quantity)

            }
        }

    }),
    remove: (id) => set((state) => {
        const exist = state.items.find((i) => i.product.id === id)
        if (!exist) return state

        const updatedItems = state.items.filter((i) => i.product.id !== id)
        const totalUpdate = state.total - (exist.product.price * exist.quantity)

        return {
            ...state,
            items: updatedItems,
            total: totalUpdate
        }
    }) ,
    clearCart: () => set((state) => {
        return {
            ...state,
            items: [],
            total: 0
        }
    }),

}))
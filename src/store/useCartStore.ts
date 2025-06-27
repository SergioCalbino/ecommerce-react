import type { Cartitem } from "@/schemas/shoppingCart.schema";
import { create } from "zustand";

interface CartState {
    items: Cartitem[];
    addToCart: (item: Cartitem) => void;
    decreaseQuantity: (item: Cartitem) => void;
    remove: (id: number) => void;
    clearCart: () => void;
    total: number;
}

export const useCartStore = create<CartState>((set) => ({
    items: [],
    total: 0,
    addToCart: (item) =>
        set((state) => {
            const exist = state.items.find((i) => i.product.id === item.product.id);
            let newItems;
            if (exist) {
                newItems = state.items.map((i) =>
                    i.product.id === item.product.id
                        ? { ...i, quantity: i.quantity + item.quantity }
                        : i
                );
            } else {
                newItems = [...state.items, item];
            }
            return {
                ...state,
                items: newItems,
                subtotal: newItems.reduce((acc, item) => acc + item.subTotal, 0),
                total: state.total + item.product.price * item.quantity,
            };
        }),
    decreaseQuantity: (item) =>
        set((state) => {
            const exist = state.items.find((i) => i.product.id === item.product.id);
            if (!exist) return state;
            let updatedItem;
            const newQuantity = exist.quantity - item.quantity;

            if (newQuantity > 0) {
                updatedItem = state.items.map((i) =>
                    i.product.id === item.product.id
                        ? { ...i, quantity: i.quantity - item.quantity }
                        : i
                );
            } else {
                updatedItem = state.items.filter(
                    (i) => i.product.id !== item.product.id
                );
            }
            return {
                ...state,
                items: updatedItem,
                subtotal: updatedItem.reduce((acc, item) => acc + item.subTotal, 0),
                total: state.total - item.product.price * item.quantity,
            };
        }),
    remove: (id) =>
        set((state) => {
            const exist = state.items.find((i) => i.product.id === id);
            if (!exist) return state;

            const updatedItems = state.items.filter((i) => i.product.id !== id);
            const totalUpdate = state.total - exist.product.price * exist.quantity;

            return {
                ...state,
                items: updatedItems,
                total: totalUpdate,
            };
        }),
    clearCart: () =>
        set((state) => {
            return {
                ...state,
                items: [],
                total: 0,
            };
        }),
}));

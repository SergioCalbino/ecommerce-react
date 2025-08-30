import type { OrderDto } from "@/schemas/order.schema"
import axios from "axios"
import api from "./axios_client/api"


export const createOrder = async (order: OrderDto ) => {
    console.log(order)
    try {
        const { data } = await api.post(`${import.meta.env.VITE_API_URL}/order/add-order`, order)
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
        
        
    }
}


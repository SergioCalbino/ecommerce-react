import type { OrderDto } from "@/schemas/order.schema";
import api from "./axios_client/api";

export const createOrder = async (order: OrderDto) => {
  console.log(order);
  try {
    const { data } = await api.post(
      `${import.meta.env.VITE_API_URL}/order/add-order`,
      order
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const { data } = await api.get(
      `${import.meta.env.VITE_API_URL}/order/orders`
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getOrdersPageable = async (page: number, size: number) => {
  try {
    const { data } = await api.get(
      `${
        import.meta.env.VITE_API_URL
      }/order/orders-paginated?page=${page}&size=${size}`
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

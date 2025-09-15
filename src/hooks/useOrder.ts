import { createOrder } from "@/api/order";
import { cartStore } from "@/store/cartStore";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";


const useOrder = () => {

    const navigate = useNavigate();
    const { clearCart } = cartStore();

    const mutation = useMutation({
        mutationFn: createOrder,
        onError: (error: AxiosError<{message:string}>) => {
            toast.error(error.response?.data.message || "Error al crear la orden")
        },
        onSuccess: (data) => {
            console.log(data)
            toast.success("Orden creada correctamente")
            clearCart()
            navigate("/")

        }
    })
    return mutation
}

export default useOrder
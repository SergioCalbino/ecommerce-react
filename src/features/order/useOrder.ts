import { createOrder } from "@/api/order";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";


const useOrder = () => {

    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: createOrder,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success("Orden creada correctamente")

        }
    })
    return mutation
}

export default useOrder
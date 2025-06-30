import { postShoppingCart } from "@/api/shoppingCart"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"




//Hace el post para agregar productos al carrito y lo persiste en la db
const useShoppingCart =  () => {
    const mutation = useMutation({
        mutationFn: postShoppingCart,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success("Seras redireccionado al checkout")

        }
    })
    return mutation
  
}

export default useShoppingCart

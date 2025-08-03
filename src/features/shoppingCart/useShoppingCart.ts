import { postShoppingCart } from "@/api/shoppingCart"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"




//Hace el post para agregar productos al carrito y lo persiste en la db
const useShoppingCart =  () => {

    const navigate = useNavigate()

    const mutation = useMutation({
        mutationFn: postShoppingCart,
        onError: (error) => {
            toast.error(error.message)
        },
        
    })
    return mutation
  
}

export default useShoppingCart

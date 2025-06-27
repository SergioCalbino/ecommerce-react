import type { Product } from '@/schemas/product.schema'
import type { Cartitem } from '@/schemas/shoppingCart.schema'
import { useCartStore } from '@/store/useCartStore'
import React, { useState } from 'react'
import { toast } from 'react-toastify'


type ProductActionsProps = {
    product: Product
}

const ProductActions = ({product}: ProductActionsProps) => {

    const [qty, setQty] = useState(1);
    const [showControl, setShowControl] = useState(false)
    const { addToCart, items, total } = useCartStore()
    console.log(qty)

    const handleAccept =  () => {
    const cartToItem: Cartitem = {
        product,
        quantity: qty,
        subTotal: product.price * qty
      }
      addToCart(cartToItem)
      setQty(1)
      setShowControl(false)
      toast.success("Producto agregado al carrito")
      console.log("SubTotal actualizado",cartToItem.subTotal)
      
    }

    console.log("Carrito actualizado agregando items", items)
    console.log("Total actualizado", total)
    


  return (
    <div className="mt-4 flex gap-2 justify-center">
      {!showControl ? (
        <button
          className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow transition"
          onClick={() => setShowControl(true)}
        >
          Agregar al carrito
        </button>
      ) : (
        <>
          <input
          type='number'
          min="1"
           className="w-16 px-3 py-1 font-semibold" 
           value={qty}
          
           onChange={(e) => setQty(Number(e.target.value))}
          />
         
          <button
            onClick={handleAccept}
            disabled={qty <= 0 || isNaN(qty)}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-500 disabled:bg-gray-300 rounded-lg shadow transition"
          >
            Aceptar
          </button>
        </>
      )}
    </div>
  )
}

export default ProductActions

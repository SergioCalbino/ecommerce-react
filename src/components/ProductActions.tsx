import type { Product } from '@/schemas/product.schema'
import React, { useState } from 'react'


type ProductActionsProps = {
    product: Product
}

const ProductActions = ({product}: ProductActionsProps) => {

    const [qty, setQty] = useState(0);
    const [showControl, setShowControl] = useState(false)
    console.log(qty)

    const handleAccept = () => {
    if (qty <= 0) {
      alert('Por favor, selecciona una cantidad válida.');
      return;
    }
}

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
          <button
            onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
            className="cursor-pointer px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
          >
            −
          </button>
          <span className="px-3 py-1 font-semibold">{qty}</span>
          <button
            onClick={() => setQty(qty + 1)}
            className="cursor-pointer px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
          >
            +
          </button>
          <button
            // onClick={handleAccept}
            className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-500 rounded-lg shadow transition"
          >
            Aceptar
          </button>
        </>
      )}
    </div>
  )
}

export default ProductActions

import type { Product } from "@/schemas/product.schema";
import type { Cartitem } from "@/schemas/shoppingCart.schema";
import { useCartStore } from "@/store/useCartStore";
import { getAvailableStock, validateStock } from "@/utils/stockUtils";
import { useState } from "react";
import { toast } from "react-toastify";

type ProductActionsProps = {
  product: Product;
};

const ProductActions = ({ product }: ProductActionsProps) => {
  const [qty, setQty] = useState(1);
  const [showControl, setShowControl] = useState(false);
  const { addToCart, items, total } = useCartStore();

  const handleAccept = () => {
    const cartToItem: Cartitem = {
      product,
      quantity: qty,
      subTotal: product.price * qty,
    };
    addToCart(cartToItem);
    setQty(1);
    setShowControl(false);
    toast.success("Producto agregado al carrito");
  };

  const isOutOfStock = validateStock(items, product)
  const availableStock = getAvailableStock(items, product)

 

  return (
    <div className="mt-4 flex gap-2 justify-center">
      {!showControl ? (
        <button
          className={`px-4 py-2 text-sm font-medium rounded-lg shadow transition
                ${isOutOfStock 
                ? 'bg-gray-400 text-gray-700 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-500 text-white cursor-pointer'}
            `}
          onClick={() => setShowControl(true)}
          disabled={isOutOfStock}
        >
        {isOutOfStock ? "Sin stock" :  "Agregar al carrito"}
        </button>
      ) : (
        <>
        <div 
            className="w-full cursor-pointer "
        >
            Cantidad
          <input
            type="number"
            min="1"
            max={Number(availableStock)}
            className="w-16 px-3 py-1 font-semibold"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
          />

        </div>

          <button
            onClick={handleAccept}
            disabled={qty < 0 || isNaN(qty)}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-500 disabled:bg-gray-300 rounded-lg shadow transition cursor-pointer"
          >
            Aceptar
          </button>
        </>
      )}
    </div>
  );
};

export default ProductActions;

import { useAuth } from "@/hooks/useAuth";
import type { Product } from "@/schemas/product.schema";
import type { Cartitem } from "@/schemas/shoppingCart.schema";
import { cartStore } from "@/store/cartStore";
import { getAvailableStock, validateStock } from "@/utils/stockUtils";
import { useState } from "react";
import { toast } from "react-toastify";

type ProductActionsProps = {
  product: Product;
  onEditProduct: (product: Product) => void;
};

const ProductActions = ({ product, onEditProduct }: ProductActionsProps) => {
  const [qty, setQty] = useState(1);
  const [showControl, setShowControl] = useState(false);
  const { addToCart, items } = cartStore();
  const { user } = useAuth();
  
  const isAdmin = user?.role === 'ADMIN';

  // ======================================================
  //  1. Early Return para el caso del Administrador
  // ======================================================
  if (isAdmin) {
    return (
      <div className="flex mt-4 gap-4">
        <button 
          className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded transition cursor-pointer"
          onClick={() => onEditProduct(product)}
        >
          Editar
        </button>
        <button
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition cursor-pointer"
        >
          Eliminar
        </button>
      </div>
    );
  }

  // ======================================================
  //  A partir de aquí, es solo lógica para el Cliente
  // ======================================================
  const isOutOfStock = validateStock(items, product);
  const availableStock = getAvailableStock(items, product);

  const handleAddToCart = () => {
    const itemToAdd: Cartitem = {
      product,
      quantity: qty,
      subTotal: product.price * qty,
    };
    addToCart(itemToAdd);
    setQty(1);
    setShowControl(false);
    toast.success("Producto agregado al carrito");
  };
  
  // Función mejorada para manejar el cambio de cantidad
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 1) {
      value = 1;
    }
    if (value > availableStock) {
      value = availableStock;
    }
    setQty(value);
  };

  // Si no hay stock, mostramos un botón deshabilitado y terminamos.
  if (isOutOfStock) {
    return (
      <div className="mt-4">
        <button 
          className="w-full bg-gray-400 text-gray-700 cursor-not-allowed font-medium py-2 px-4 rounded-lg"
          disabled
        >
          Sin stock
        </button>
      </div>
    );
  }

  // Si hay stock, mostramos el botón de agregar o el control de cantidad
  return (
    <div className="mt-4">
      {!showControl ? (
        <button
          className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded transition"
          onClick={() => setShowControl(true)}
        >
          Agregar al carrito
        </button>
      ) : (
        <div className="flex items-center justify-center gap-4">
          <input
            type="number"
            min="1"
            max={availableStock}
            className="w-20 text-center p-2 border border-gray-300 rounded-lg"
            value={qty}
            onChange={handleQuantityChange}
          />
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 font-medium text-white bg-green-600 hover:bg-green-500 rounded-lg shadow-md transition"
          >
            Aceptar
          </button>
          <button
            onClick={() => setShowControl(false)}
            className="px-2 py-2 text-gray-500 hover:text-gray-800"
            title="Cancelar"
          >
            {/* Ícono de X para cancelar */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductActions;
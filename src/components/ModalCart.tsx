import useShoppingCart from "@/features/shoppingCart/useShoppingCart";
import { useCartStore } from "@/store/useCartStore";
import { X, Trash2, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

type modalCartProps = {
  open: boolean;
  onClose: () => void;
};

const ModalCart = ({ open, onClose }: modalCartProps) => {
  const { items, total, remove, clearCart } = useCartStore();
  const { mutateAsync } = useShoppingCart();

  const navigate = useNavigate()

 

  //Agrega productos al carrito
  const handleSubmit = async () => {
     console.log("Items que voy a enviar:", items);
    for(const item of items) {
        const payload = {
            customerDto: {
                customer_id: 11,
                email: "sergito@gmail.com",
            },
                quantity: item.quantity,
                productDto: {
                    id: item.product.id
                }
        }
        await mutateAsync(payload)
        console.log("Redirigiendo a checkout", items)
        clearCart()
        // navigate("/checkout")
    }
    

  }

  return (
    open && (
      <div className="fixed inset-0 z-50 bg-black/50 flex justify-end m-2">
        <div className="bg-white w-full sm:w-[400px] lg:w-[500px] h-full sm:h-[90%] sm:mt-4 sm:rounded-2xl shadow-lg flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-bold flex items-center gap-2">🛒 Tu Carrito</h2>
            <button onClick={onClose}>
              <X className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
            </button>
          </div>

          {/* Lista de productos */}
          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
            {items.length > 0 ? (
              items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-4 border-b pb-4">
                  <img
                    src={item.product.image || "https://via.placeholder.com/60"}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1 text-sm">
                    <p className="font-semibold">{item.product.name}</p>
                    <p>Cantidad: {item.quantity}</p>
                    <p>Precio: ${item.product.price.toFixed(2)}</p>
                    {/* <p className="font-medium text-blue-600">Subtotal: ${item.subTotal.toFixed(2)}</p> */}
                    <p className="font-medium text-blue-600">Subtotal: ${Number(item.product.price.toFixed(2)) * item.quantity }</p>
                  </div>
                  <button onClick={() => remove(item.product.id)} title="Eliminar">
                    <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700 cursor-pointer" />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-6">Tu carrito está vacío 🛍️</p>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t">
            <div className="flex justify-between items-center mb-4 text-lg font-semibold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex gap-2">
              <button
                className="flex-1 p-2 rounded bg-red-500 hover:bg-red-700 text-white font-semibold cursor-pointer"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button className="flex-1 p-2 rounded bg-green-500 hover:bg-green-600 text-white font-semibold flex items-center justify-center gap-1 cursor-pointer"
                onClick={handleSubmit}
              >
                <CheckCircle className="w-4 h-4" /> Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ModalCart;

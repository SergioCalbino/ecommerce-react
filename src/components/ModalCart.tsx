
import { useCartStore } from "@/store/useCartStore";

type modalCartProps = {
  open: boolean;
  onClose: () => void;
};



const ModalCart = ({ open, onClose }: modalCartProps) => {
  const { items, total, remove } = useCartStore();

  const handleQuit = (id:number) => {
	remove(id)
  }


  return (
    <div>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-end items-start">
          <div className="bg-white sm:w-[400px] w-full h-4/5 shadow-xl p-6 relative overflow-y-auto lg:w-[500px] ">
            {/* Botón cerrar */}
            <div className="flex items-center mb-4">
              {/* Título */}
              <h2 className="text-xl font-semibold ">🛒 Tu Carrito</h2>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="timeline-modal"
                onClick={onClose}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>

                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="mt-10">
				    {/* Aquí van los productos */}
            {items.length > 0 ? (
              items.map((item) => (
				<>
                <div
                  key={item.product.id}
                  className="flex gap-4 items-center border-b pb-4 mt-4"
                >
                  {/* Imagen del producto */}
                  <img
                    src={item.product.image || "https://via.placeholder.com/60"}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />

                  {/* Detalle */}
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-800">
                      Nombre: {item.product.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Cantidad: {item.quantity}
                    </p>
                    <p className="text-sm text-gray-800 font-medium">
                      Precio $ {item.product.price.toFixed(2)}
					  
                    </p>
                    <p className="text-sm text-gray-800 font-medium">
                      Subtotal: ${item.subTotal.toFixed(2)}
					  
                    </p>
                  </div>

                  {/* Botón eliminar o reducir */}
                  <button className="text-red-500 hover:text-red-700 text-sm"
				  	onClick={() => handleQuit(item.product.id)}

				  >
                    ✕
                  </button>
                </div>
				
				</>
              ))
            ) : (
              <p className="text-gray-600">Tu carrito está vacío.</p>
            )}
			</div>
			<div>
					Total: ${total}
				</div>
        
          </div>
        </div>
      )}

      {/* <!-- Main modal --> */}
    </div>
  );
};

export default ModalCart;

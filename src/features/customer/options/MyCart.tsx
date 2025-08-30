import { cartStore } from '@/store/cartStore'

const MyCart = () => {

   const { items } = cartStore();

  // Calcular el total general
  const total = items.reduce(
    (acc: number, item: any) => acc + item.product.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return <p className="text-gray-600">Tu carrito está vacío</p>;
  }

  return (
    <div className="bg-white shadow-md rounded-2xl p-4">
      <h3 className="text-xl font-semibold mb-4">Detalle del carrito</h3>

      <ul className="divide-y divide-gray-200">
        {items.map((item: any) => (
          <li key={item.id} className="flex justify-between py-3">
            <div>
              <p className="font-medium">{item.product.name}</p>
              <p className="text-sm text-gray-500">
                Cantidad: {item.quantity} | Precio: ${item.product.price}
              </p>
            </div>
            <div className="font-semibold">
              ${item.product.price * item.quantity}
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center mt-4 border-t pt-4">
        <span className="text-lg font-bold">Total:</span>
        <span className="text-lg font-bold text-fuchsia-600">${total}</span>
      </div>
    </div>
  );
}

export default MyCart

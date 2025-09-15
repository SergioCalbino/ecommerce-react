import useOrders from '@/hooks/useOrders'
import useOrdersPaginated from '@/hooks/useOrdersPaginated';
import type { Order, OrderItemResponse, OrderResponse } from '@/schemas/order.schema';
import React, { useState } from 'react'

const MyOrders = () => {
  // const { data } = useOrders();
  const [page, setPage] = useState(0);
  const size = 5;
  const { data } = useOrdersPaginated(page, size)

  console.log(data)
  

  return (
    <div className="max-w-4xl mx-auto mt-8 space-y-6">
      {data?.content.map((order: OrderResponse) => (
        <div
          key={order.id}
          className="rounded-2xl border shadow-md p-6 bg-white hover:shadow-lg transition"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Orden #{order.id}
            </h3>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                order.state === 'PENDING'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'
              }`}
            >
              {order.state}
            </span>
          </div>

          {/* Customer Info */}
          <p className="text-gray-600 mb-2">
            <span className="font-medium">Cliente:</span>{' '}
            {order.customerResponseDto.name}
          </p>
          <p className="text-gray-600 mb-4">
            <span className="font-medium">Fecha:</span>{' '}
            {new Date(order.date).toLocaleDateString()}
          </p>

          {/* Items */}
          <ul className="divide-y divide-gray-200">
            {order.orderItemResponseDto?.map((item: OrderItemResponse) => (
              <li key={item.id} className="py-4 flex justify-between">
                <div>
                  <p className="font-medium text-gray-800">
                    {item.productResponseDto.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.productResponseDto.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    Cantidad: {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-800 font-semibold">
                    ${item.unitPrice}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Subtotal: ${item.subtotal}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {/* Total */}
          <div className="flex justify-end mt-4">
            <p className="text-lg font-bold text-gray-900">
              Total: ${order.total}
            </p>
          </div>
        </div>
      ))}
      {/* Pagination */}
  {/* Pagination */}
    <div className="flex justify-center space-x-4 mt-4">
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
        disabled={page === 0}
        className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50 cursor-pointer"
      >
        Anterior
      </button>
      {/* Botones numerados */}
      {Array.from({ length: data?.totalPages ?? 1 }, (_, i) => (
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`px-3 py-1 rounded-lg cursor-pointer ${
            page === i
              ? "bg-purple-600 text-white font-semibold"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => setPage((prev) => Math.min(prev + 1, (data?.totalPages ?? 1) - 1))}
        disabled={page >= (data?.totalPages ?? 1) - 1}
        className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50 cursor-pointer"
      >
        Siguiente
      </button>
    </div>

    </div>
  )
}

export default MyOrders

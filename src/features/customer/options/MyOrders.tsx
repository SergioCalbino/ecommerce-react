import useOrders from '@/features/order/useOrders'
import type { Order, OrderItemResponse, OrderResponse } from '@/schemas/order.schema';
import React from 'react'

const MyOrders = () => {
  const { data } = useOrders();

  return (
    <div className="max-w-4xl mx-auto mt-8 space-y-6">
      {data?.map((order: OrderResponse) => (
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
    </div>
  )
}

export default MyOrders

import type { CheckOutStepOne } from '@/schemas/customer.schema';
import type { CheckoutStepTwo, OrderDto } from '@/schemas/order.schema';
import React from 'react'
import useOrder from '../../hooks/useOrder';
import { cartStore } from '@/store/cartStore';


type CheckoutType = {
    step: number,
    setStep:  React.Dispatch<React.SetStateAction<number>>,
    customerData: CheckOutStepOne | null,
    paymentData: CheckoutStepTwo | null


}

const CheckoutStepThree = ({step, setStep, customerData, paymentData}:CheckoutType ) => {

  const { total, items } = cartStore();

  console.log("Total en step three:", total);
  console.log("Items en step three:", items);

  const { mutateAsync } = useOrder()

    if (!customerData || !paymentData) {
        return
        }
        const orderPayload: OrderDto = {
            date: new Date(),
            customerDto: {
                id: customerData.id,
                email: customerData.email,
                name: customerData.name,
                telephone: customerData.telephone,
                address: customerData.address,

            },
            orderItemDto: items.map(item => ({
              productId: item.product.id,
              quantity: item.quantity,
              unitPrice: item.product.price
            })),
            total: total,
            state: "PENDING"
    }
    

    

    const handleForm = async (e: React.FormEvent) => {
      e.preventDefault()
       console.log("Enviando datos", orderPayload);
       await mutateAsync(orderPayload)
      
       
    }

  return (
      <form
            className="space-y-4 shadow-lg p-10 bg-gray-100"
                onSubmit={(handleForm)}
                noValidate
              >
   <div>
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Confirmación</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  ¡Gracias por tu compra! Recibirás un email con el detalle de tu pedido.
                </p>
                <button
                  className="mt-8 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-white font-medium cursor-pointer"
                 
                >
                  Finalizar Compra
                </button>
                <button
                  className="mt-4 w-full rounded-lg bg-gray-200 px-5 py-2.5 text-gray-700 font-medium cursor-pointer"
                  onClick={() => setStep(2)}
                >
                  Atrás
                </button>
              </div>
              </form>
  )
}

export default CheckoutStepThree

import { useState } from "react";
import CheckoutStepOne from "./CheckoutStepOne";
import type { CheckOutStepOne } from "@/schemas/customer.schema";
import type { CheckoutStepTwo as CheckoutStepTwoData } from "@/schemas/order.schema";
import CheckoutStepTwo from "./CheckoutStepTwo";










const Checkout = () => {
  const [step, setStep] = useState<number>(1);
  const [customerData, setCustomerData] = useState<CheckOutStepOne | null >(null)
   const [paymentData, setPaymentData] = useState<CheckoutStepTwoData | null>(null);

   console.log(paymentData, customerData)




  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Columna principal: pasos */}
          <div className="md:col-span-2">
            {/* Pasos */}
            <ol className="flex items-center mb-8 text-sm font-medium text-gray-500 dark:text-gray-400">
              <li className={`flex items-center ${step >= 1 ? "text-blue-600" : ""}`}>
                <span className="me-2">1</span> Datos
                <span className="mx-4">/</span>
              </li>
              <li className={`flex items-center ${step >= 2 ? "text-blue-600" : ""}`}>
                <span className="me-2">2</span> Pago
                <span className="mx-4">/</span>
              </li>
              <li className={`flex items-center ${step === 3 ? "text-blue-600" : ""}`}>
                <span className="me-2">3</span> Confirmar
              </li>
            </ol>

            {/* Paso 1: Datos del comprador */}
            {step === 1 && (
            <CheckoutStepOne 
              step={step}
              setStep={setStep}
              onSubmit={(data) => {
                setCustomerData(data)
                setStep(2)
              }}
            />
            )}

            {/* Paso 2: Método de pago */}
            {step === 2 && (
              <CheckoutStepTwo
                step={step}
                setStep={setStep}
                onSubmit={(data: CheckoutStepTwoData) => {
                setPaymentData(data)
                setStep(3)
              }}
              
              />
            )}

            {/* Paso 3: Confirmación */}
            {step === 3 && (
              <div>
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Confirmación</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  ¡Gracias por tu compra! Recibirás un email con el detalle de tu pedido.
                </p>
                <button
                  className="mt-8 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-white font-medium"
                  onClick={() => alert("¡Compra finalizada!")}
                >
                  Finalizar Compra
                </button>
                <button
                  className="mt-4 w-full rounded-lg bg-gray-200 px-5 py-2.5 text-gray-700 font-medium"
                  onClick={() => setStep(2)}
                >
                  Atrás
                </button>
              </div>
            )}
          </div>

          {/* Columna lateral: resumen */}
          <div className="md:col-span-1">
            <div className="rounded-lg bg-gray-50 p-6 shadow-md dark:bg-gray-800">
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Resumen de la Orden</h2>
              <ul className="mb-6 space-y-4">
                <li className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Producto 1</span>
                  <span className="text-gray-900 dark:text-white">$100</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Producto 2</span>
                  <span className="text-gray-900 dark:text-white">$150</span>
                </li>
              </ul>
              <div className="mb-4 flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
                <span className="text-lg font-medium text-gray-900 dark:text-white">Total</span>
                <span className="text-lg font-medium text-gray-900 dark:text-white">$250</span>
              </div>
              <div className="mt-6 flex items-center justify-center">
                <svg
                  className="h-10 w-10 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <p className="ml-2 text-sm text-gray-600 dark:text-gray-300">Pago seguro garantizado</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
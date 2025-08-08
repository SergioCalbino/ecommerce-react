import type {  CheckoutStepTwo as CheckoutStepTwoData } from '@/schemas/order.schema'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'


type CheckoutType = {
    step: number,
    setStep: React.Dispatch<React.SetStateAction<number>>
    onSubmit: (data: CheckoutStepTwoData) => void
    
}


      const CheckoutStepTwo = ({step, setStep, onSubmit}: CheckoutType) => {
     const [paymentMethod, setPaymentMethod] = useState<"tarjeta" | "mercadopago">("tarjeta");

     const defaultValues: CheckoutStepTwoData = {
       cardNumber: "",
       expiration: "",
       cvc:"",
       cardName: "" 
     }

     const {  register, handleSubmit, formState: {errors} } = useForm<CheckoutStepTwoData>({defaultValues})

     const handleForm = (data:CheckoutStepTwoData ) => {
      onSubmit(data)
     }
    
  return (
     <form
      onSubmit={handleSubmit(handleForm)}
                className="space-y-4"
               
              >
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Método de Pago
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="payment"
                        value="tarjeta"
                        checked={paymentMethod === "tarjeta"}
                        onChange={() => setPaymentMethod("tarjeta")}
                        className="h-4 w-4 text-blue-600 border-gray-300"
                      />
                      <span className="ml-2">Tarjeta</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="payment"
                        value="mercadopago"
                        checked={paymentMethod === "mercadopago"}
                        onChange={() => setPaymentMethod("mercadopago")}
                        className="h-4 w-4 text-blue-600 border-gray-300"
                      />
                      <span className="ml-2">Mercado Pago</span>
                    </label>
                  </div>
                </div>

                {/* Formulario según método */}
                {paymentMethod === "tarjeta" ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Número de Tarjeta
                      </label>
                      <input
                        type="text"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:bg-gray-700 dark:text-white"
                        placeholder="1234 5678 9012 3456"
                        {...register("cardNumber", {
                        required: "El numero de tarjeta es requerido"
                      })}
                    aria-invalid={errors.cardNumber ? "true" : "false"}
                    />
                    {errors?.cardNumber && <p className="text-red-500" role="alert">{errors.cardNumber?.message}</p>}
                    </div>
                    <div className="flex gap-4">
                      <div className="w-1/2">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Vencimiento
                        </label>
                        <input
                          type="text"
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:bg-gray-700 dark:text-white"
                          placeholder="MM/AA"
                           {...register("expiration", {
                            required: "Complete la fecha de vencimiento"
                          })}
                        aria-invalid={errors.expiration ? "true" : "false"}
                        />
                        {errors?.expiration && <p className="text-red-500" role="alert">{errors.expiration?.message}</p>}
                      
                      </div>
                      <div className="w-1/2">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          CVC
                        </label>
                        <input
                          type="text"
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:bg-gray-700 dark:text-white"
                          placeholder="123"
                          {...register("cvc", {
                            required: "Numero de seguidad sin completar"
                          })}
                        aria-invalid={errors.cvc ? "true" : "false"}
                        />
                        {errors?.cvc && <p className="text-red-500" role="alert">{errors.cvc?.message}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Nombre en la tarjeta
                      </label>
                      <input
                        type="text"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:bg-gray-700 dark:text-white"
                        {...register("cardName", {
                            required: "Complete el nombre como esta en la tarjeta"
                          })}
                        aria-invalid={errors.cardName ? "true" : "false"}
                        />
                        {errors?.cardName && <p className="text-red-500" role="alert">{errors.cardName?.message}</p>}
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      Serás redirigido a Mercado Pago para completar el pago.
                    </p>
                  </div>
                )}

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="rounded-lg bg-gray-200 px-5 py-2.5 text-gray-700 font-medium cursor-pointer"
                  >
                    Atrás
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-blue-700 px-5 py-2.5 text-white font-medium cursor-pointer"
                  >
                    Siguiente
                  </button>
                </div>
              </form>
  )
}

export default CheckoutStepTwo

import { useState } from "react";
import CheckoutStepOne from "./CheckoutStepOne";
import type { CheckOutStepOne } from "@/schemas/customer.schema";
import type { CheckoutStepTwo as CheckoutStepTwoData } from "@/schemas/order.schema";
import CheckoutStepTwo from "./CheckoutStepTwo";
import CheckoutStepThree from "./CheckoutStepThree";
import DetailResume from "./DetailResume";

const Checkout = () => {
  const [step, setStep] = useState<number>(1);
  const [customerData, setCustomerData] = useState<CheckOutStepOne | null>(
    null
  );
  const [paymentData, setPaymentData] = useState<CheckoutStepTwoData | null>(
    null
  );


  return (
    <section className="bg-white dark:bg-gray-900 ">
      {/* <div className="px-4 py-8"> */}
      <div className="flex flex-col md:flex-row justify-center items-start gap-8 px-4 py-8 max-w-4xl mx-auto">
        {/* Columna principal: pasos */}
        <div className="flex-1 flex flex-col items-center min-w-[420px] w-full max-w-full md:max-w-xl lg:max-w-2xl">
          {/* Pasos */}
          <ol className="flex items-center mb-8 text-sm font-medium text-gray-500 dark:text-gray-400">
            <li
              className={`flex items-center ${
                step >= 1 ? "text-blue-600" : ""
              }`}
            >
              <span className="me-2">1</span> Datos
              <span className="mx-4">/</span>
            </li>
            <li
              className={`flex items-center ${
                step >= 2 ? "text-blue-600" : ""
              }`}
            >
              <span className="me-2">2</span> Pago
              <span className="mx-4">/</span>
            </li>
            <li
              className={`flex items-center ${
                step === 3 ? "text-blue-600" : ""
              }`}
            >
              <span className="me-2">3</span> Confirmar
            </li>
          </ol>

          {/* Paso 1: Datos del comprador */}
          {step === 1 && (
            <CheckoutStepOne
              step={step}
              setStep={setStep}
              onSubmit={(data) => {
                setCustomerData(data);
                setStep(2);
              }}
            />
          )}

          {/* Paso 2: Método de pago */}
          {step === 2 && (
            <CheckoutStepTwo
              step={step}
              setStep={setStep}
              onSubmit={(data: CheckoutStepTwoData) => {
                setPaymentData(data);
                setStep(3);
              }}
            />
          )}

          {/* Paso 3: Confirmación */}
          {step === 3 && (
            <CheckoutStepThree
              step={step}
              setStep={setStep}
              paymentData={paymentData}
              customerData={customerData}
            />
          )}
        </div>

        {/* Columna lateral: resumen */}
        <div className="w-full flex justify-center md:justify-start">
          <div className="w-full max-w-lg">
            <DetailResume />
          </div>
        </div>
      </div>
      {/* </div> */}
    </section>
  );
};

export default Checkout;

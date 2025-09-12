import type { CheckOutStepOne } from "@/schemas/customer.schema";
import { authStore } from "@/store/authStore";
import { useForm } from "react-hook-form";


type checkoutType = {
    step: number,
    setStep: React.Dispatch<React.SetStateAction<number>>;
    onSubmit: (data: CheckOutStepOne) => void
}

const CheckoutStepOne = ({ step, setStep, onSubmit }: checkoutType) => {

  const { user } = authStore();

    const defaultValues:CheckOutStepOne  = {
    id: user?.id || 0,
    name: user?.name || "",
    email: user?.email || "",
    telephone: user?.telephone || "",
    address: user?.address || ""
  }

  const { register, handleSubmit, formState: {errors}  } = useForm<CheckOutStepOne>({defaultValues})

  const handleForm = (data:CheckOutStepOne) => {
    onSubmit(data)
  }

  return (
   
      <form
          className="w-full space-y-4 shadow-lg p-6 bg-gray-100 rounded-lg"
                onSubmit={handleSubmit(handleForm)}
                noValidate
              >
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:bg-gray-700 dark:text-white"
                    placeholder="Nombre"
                    {...register("name", {
                      required: "El nombre es requerido"
                    })}
                   aria-invalid={errors.name ? "true" : "false"}
                  />
                  {errors?.name && <p className="text-red-500" role="alert">{errors.name?.message}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:bg-gray-700 dark:text-white"
                    placeholder="Email"
                     {...register("email", {
                      required: "El email es requerido"
                    })}
                     aria-invalid={errors?.email ? "true" : "false"}
                  />
                  {errors?.email && <p className="text-red-500" role="alert">{errors.email.message}</p>}

                </div>
                <div>
                  <label htmlFor="telephone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="telephone"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:bg-gray-700 dark:text-white"
                     placeholder="Telefono"
                     {...register("telephone", {
                      required: "El telefono es requerido"
                    })}
                   aria-invalid={errors?.telephone ? "true" : "false"}
                  />
                  {errors?.telephone && <p className="text-red-500" role="alert">{errors.telephone.message}</p>}
                </div>
                <div>
                  <label htmlFor="domicilio" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Domicilio
                  </label>
                  <input
                    type="text"
                    id="domicilio"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:bg-gray-700 dark:text-white"
                     placeholder="Domicilio"
                     {...register("address", {
                      required: "El domicilio es requerido"
                    })}
                    
                   aria-invalid={errors?.address ? "true" : "false"}
                  />
                  {errors?.address && <p className="text-red-500" role="alert">{errors.address.message}</p>}
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-white font-medium cursor-pointer"
                >
                  Siguiente
                </button>
              </form>

    
  )
}

export default CheckoutStepOne

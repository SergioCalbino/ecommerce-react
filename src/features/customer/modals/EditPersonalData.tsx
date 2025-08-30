
import { updateProfile } from "@/api/customer";
import type { CustomerUpdate } from "@/schemas/customer.schema";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export type EditPersonalDataProps = {
  user: CustomerUpdate;
  openModal: boolean;
  setOpenModal: (isOpen: boolean) => void;
};


const EditPersonalData = ({ user, openModal, setOpenModal }: EditPersonalDataProps) => {

  const queryClient = useQueryClient();

  const initialValues: CustomerUpdate = {
    name: user.name,
    email: user.email,
    telephone: user.telephone,
    address: user.address
  }

  const { register, handleSubmit, formState: { errors } } = useForm<CustomerUpdate>({
    defaultValues: initialValues
  });

  const { mutate, } = useMutation({
    mutationFn: updateProfile,
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message)

    },
    onSuccess: () => {
      toast.success("Datos actualizados de forma correcta")
      queryClient.invalidateQueries({ queryKey: ['customer-profile'] });
    }
  })

  const handleRegister = (formData: CustomerUpdate) => {
    mutate(formData)

  }



  return (
    <div className="max-w-3xl mx-auto mt-10 px-4 relative bg-white p-8 rounded-md shadow">

      <p className="text-xl font-light text-white mt-3 text-center">
        <span className="text-gray-950 font-bold">Actualizar datos personales</span>
      </p>
      <button
        onClick={() => setOpenModal(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
      >
        <XMarkIcon className="h-6 w-6" />
      </button>
      
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 mt-8 rounded-md shadow"
        noValidate
      >
        {/* Email */}
        <div>
          <label className="font-semibold block mb-1 text-gray-700">
            Email
          </label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Email no válido",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Nombre */}
        <div>
          <label className="font-semibold block mb-1 text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            {...register("name", {
              required: "El nombre es obligatorio",
            })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Domicilio */}
        <div>
          <label className="font-semibold block mb-1 text-gray-700">
            Domicilio
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            {...register("address", {
              required: "El domicilio es obligatorio",
            })}
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}
        </div>

        {/* Teléfono */}
        <div>
          <label className="font-semibold block mb-1 text-gray-700">
            Teléfono
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            {...register("telephone", {
              required: "El teléfono es obligatorio",
            })}
          />
          {errors.telephone && (
            <p className="text-red-500 text-sm">{errors.telephone.message}</p>
          )}
        </div>


        {/* Botón de envío (ocupa 2 columnas) */}
        <div className="md:col-span-2">
          <input
            type="submit"
            value="Actualizar"
            className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full text-white font-bold py-3 rounded cursor-pointer transition-colors"
          />
        </div>
      </form>

    </div>
  );
}

export default EditPersonalData

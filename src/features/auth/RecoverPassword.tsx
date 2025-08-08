import { sendEmailToRecoveryPassword } from "@/api/Auth"
import type { RecoveryPassword } from "@/schemas/auth.schema"
import { useMutation } from "@tanstack/react-query"
import type { AxiosError } from "axios"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"


export default function RecoverPassword ()  {
    const initialValues: RecoveryPassword = {
    email: '',
  }
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

  const { mutate } = useMutation({
    mutationFn: sendEmailToRecoveryPassword,
    onError: (error: AxiosError<{ message:String }>) => {
        toast.error(error.response?.data.message)

    },
    onSuccess: (data) => {
        toast.success("Se ha enviado un email a la casilla de correo indicada")
        reset()

    }
  })


  const handleSendEmail = (formData: RecoveryPassword) => {
    mutate(formData)
   }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleSendEmail)}
        className="space-y-8 p-10 bg-white"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Email</label>

          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && (
            errors.email.message
          )}
        </div>

        

        <input
          type="submit"
          value='Recuperar contraseña'
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>
    </>
  )

}


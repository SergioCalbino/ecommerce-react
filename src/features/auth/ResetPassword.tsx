import { sendResetPassword } from '@/api/Auth'
import type { ResetPasswordUser } from '@/schemas/auth.schema'
import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function ResetPassword() {

    const [params] = useSearchParams()
    const token = params.get('token')
    console.log(token)

    const navigate = useNavigate();


  const initialValues: ResetPasswordUser = {
    password: '',
    password_confirmation: ''
  }
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: initialValues })


  const { mutate } = useMutation({
    mutationFn: sendResetPassword,
    onError:(error: AxiosError<{message: string}>) => {
        toast.error(error.response?.data.message)

    },
    onSuccess: (data) => {
        toast.success(data)
    }
  })

  const handleLogin = (formData: ResetPasswordUser) => {
    const dataToSend = {
        token: token,
        password: formData.password
    } 
    mutate(dataToSend)
    navigate("/auth/login")
  }

  const password = watch('password');

  return (
    <>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-10 bg-white"
        noValidate
      >
       

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Password</label>

          <input
            type="password"
            placeholder="Cambiar password"
            className="w-full p-3  border-gray-300 border"
            {...register("password", {
              required: "El Password es obligatorio",
            })}
          />
          {errors.password && (
            errors.password.message
          )}
        </div>
        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Confirmar Password</label>

          <input
            type="password"
            placeholder="Repetir password"
            className="w-full p-3  border-gray-300 border"
            {...register("password_confirmation", {
              required: "El Password es obligatorio",
              validate: value => value === password || "Los password no coinciden"
            })}
          />
          {errors.password_confirmation && (
            errors.password_confirmation.message
          )}
        </div>

        <input
          type="submit"
          value='Guardar Password'
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>
    </>
  )
}

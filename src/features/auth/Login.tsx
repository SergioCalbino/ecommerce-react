import { loginAccount } from "@/api/Auth";
import type { UserLoginForm } from "@/schemas/auth.schema";
import { useAuthStore } from "@/store/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function Login() {

  const initialValues: UserLoginForm = {
    email: '',
    password: '',
  }
  const { register, handleSubmit, reset ,formState: { errors } } = useForm({ defaultValues: initialValues })

  const { login, user } = useAuthStore()
  const navigate = useNavigate()

  console.log(user)


  const { mutate, isPending } = useMutation({
    mutationFn: loginAccount,
    onError : (error: AxiosError<{message:string}>) => {
      console.log(error?.response?.data.message)
      toast.error(error?.response?.data.message)
      

    },
    onSuccess: (data) => {
      const { accessToken, customer } = data;
      login(accessToken, customer)
      toast.success("Logueado de forma exitosa, serás redireccionado" , {
        onClose:() =>  navigate("/")
      })
      reset()
     


    }
  })

  const handleLogin = (formData: UserLoginForm) => {
    mutate(formData)

   }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-10 bg-white"
        noValidate
      >
         <fieldset disabled={isPending} className="space-y-8">
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
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Password</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("password", {
              required: "El Password es obligatorio",
            })}
          />
          {errors.password && (
           <span className="text-red-500 text-sm">{errors.password.message}</span>
          )}
        </div>

        <input
          type="submit"
          value={isPending ? 'Iniciando sesión...' : 'Iniciar Sesión'}
           className={`bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-black text-xl cursor-pointer 
            ${isPending ? 'opacity-50 cursor-not-allowed hover:bg-fuchsia-600' : ''}`}
          disabled={isPending}
        />
        </fieldset>
      </form>
      <nav className="mt-10 flex flex-col space-y-4">
        <Link to={'/auth/register'}
            className="text-center text-gray-300 font-normal"
        >
          ¿ No tienes cuenta ? Crear una
        </Link>
        <Link to={'/auth/forgot-password'}
            className="text-center text-gray-300 font-normal"
        >
          ¿ Olvidaste la contraseña ? Recupérala
        </Link>

      </nav>
    </>
  )
}
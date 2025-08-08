import { createAccount } from "@/api/Auth";
import type { UserRegistrationForm } from "@/schemas/auth.schema";
import { useAuthStore } from "@/store/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const initialValues: UserRegistrationForm = {
    name: '',
    email: '',
    password: '',
    address: '',
    telephone: '',
    password_confirmation: ''
  };

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<UserRegistrationForm>({
    defaultValues: initialValues,
  });

  const { registerAuth } = useAuthStore();
  const navigate = useNavigate()

  const { mutate } = useMutation({
    mutationFn: createAccount,
    onError: (error: AxiosError<{message:string}>) => { 
        console.log(error?.response?.data.message)
        toast.error(error?.response?.data.message)

    },
    onSuccess: (data) => {
        console.log(data)
        // const { token, customer } = data;
        // registerAuth(token, customer)
        reset()
        toast.success("Registrado de forma exitosa, serás redireccionado al login" , {
        onClose:() =>  navigate("/auth/login")
      })

       
    }
  })

  const password = watch('password');

  const handleRegister = (formData: UserRegistrationForm) => {
    mutate(formData)
    
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-4xl font-black text-white">Crear Cuenta</h1>
      <p className="text-xl font-light text-white mt-3">
        Llena el formulario para <span className="text-fuchsia-500 font-bold">crear tu cuenta</span>
      </p>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 mt-8 rounded-md shadow"
        noValidate
      >
        {/* Email */}
        <div>
          <label className="font-semibold block mb-1 text-gray-700">Email</label>
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
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Nombre */}
        <div>
          <label className="font-semibold block mb-1 text-gray-700">Nombre</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            {...register("name", {
              required: "El nombre es obligatorio",
            })}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Domicilio */}
        <div>
          <label className="font-semibold block mb-1 text-gray-700">Domicilio</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            {...register("address", {
              required: "El domicilio es obligatorio",
            })}
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
        </div>

        {/* Teléfono */}
        <div>
          <label className="font-semibold block mb-1 text-gray-700">Teléfono</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            {...register("telephone", {
              required: "El teléfono es obligatorio",
            })}
          />
          {errors.telephone && <p className="text-red-500 text-sm">{errors.telephone.message}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="font-semibold block mb-1 text-gray-700">Password</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded"
            {...register("password", {
              required: "El Password es obligatorio",
              minLength: {
                value: 8,
                message: "El Password debe tener al menos 8 caracteres",
              },
            })}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        {/* Confirmar Password */}
        <div>
          <label className="font-semibold block mb-1 text-gray-700">Repetir Password</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded"
            {...register("password_confirmation", {
              required: "Este campo es obligatorio",
              validate: value => value === password || "Los passwords no coinciden",
            })}
          />
          {errors.password_confirmation && (
            <p className="text-red-500 text-sm">{errors.password_confirmation.message}</p>
          )}
        </div>

        {/* Botón de envío (ocupa 2 columnas) */}
        <div className="md:col-span-2">
          <input
            type="submit"
            value="Registrarme"
            className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full text-white font-bold py-3 rounded cursor-pointer transition-colors"
          />
        </div>
      </form>
      <nav className="mt-10 flex flex-col space-y-4">
        <Link to={'/auth/login'}
            className="text-center text-gray-300 font-normal"
        >
          ¿ Ya tienes cuenta ? Iniciar sesión
        </Link>
         <Link to={'/auth/forgot-password'}
            className="text-center text-gray-300 font-normal"
        >
          ¿ Olvidaste la contraseña ? Recupérala
        </Link>

      </nav>
    </div>
  );
}

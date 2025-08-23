import useChangePassword from "@/hooks/useChangePassword";
import type { CustomerChangePassword } from "@/schemas/customer.schema";
import { useForm } from "react-hook-form";

const ChangePasswordForm = () => {
  const { mutate } = useChangePassword();

  const initialValues: CustomerChangePassword = {
    oldPassword: "",
    newPassword: "",
    repeatPassword: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<CustomerChangePassword>({
    defaultValues: initialValues,
  });

  const handleChangePassword = (formData: CustomerChangePassword) => {
    console.log(formData);
    mutate(formData);
    reset();
  };

  const newPassword = watch("newPassword");

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <form
        onSubmit={handleSubmit(handleChangePassword)}
        className="flex flex-col gap-6 bg-white p-8 mt-8 rounded-md shadow"
        noValidate
      >
        {/* Password */}
        <div>
          <label className="font-semibold block mb-1 text-gray-700">
            Password actual
          </label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded"
            {...register("oldPassword", {
              required: "El Password es obligatorio",
            })}
          />
          {errors.oldPassword && (
            <p className="text-red-500 text-sm">{errors.oldPassword.message}</p>
          )}
        </div>

        {/* Nuevo Password */}
        <div>
          <label className="font-semibold block mb-1 text-gray-700">
            Nuevo Password
          </label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded"
            {...register("newPassword", {
              required: "Este campo es obligatorio",
              minLength: {
                value: 8,
                message: "El Password debe tener al menos 8 caracteres",
              },
            })}
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
          )}
        </div>

        {/* Confirmar Password */}
        <div>
          <label className="font-semibold block mb-1 text-gray-700">
            Confirmar Nuevo Password
          </label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded"
            {...register("repeatPassword", {
              required: "Este campo es obligatorio",
              minLength: {
                value: 8,
                message: "El Password debe tener al menos 8 caracteres",
              },
              validate: (value) =>
                value === newPassword || "Los passwords no coinciden",
            })}
          />
          {errors.repeatPassword && (
            <p className="text-red-500 text-sm">
              {errors.repeatPassword.message}
            </p>
          )}
        </div>

        {/* Botón de envío (ocupa 2 columnas) */}
        <div className="md:col-span-2">
          <input
            type="submit"
            value="Actualizar Password"
            className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full text-white font-bold py-3 rounded cursor-pointer transition-colors"
          />
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;

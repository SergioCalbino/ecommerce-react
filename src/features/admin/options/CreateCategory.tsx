import { useCreateCategory } from "@/hooks/useCategories"
import type { CategoryCreate } from "@/schemas/category.schema"
import { useForm } from "react-hook-form"


const CreateCategory = () => {


    const initialValues: CategoryCreate = {
        name: ''
    }

    const { register, handleSubmit, reset, formState: { errors} } = useForm<CategoryCreate>({
        defaultValues: initialValues
    })

    const { mutate } = useCreateCategory()

    const handleCreate = (data: CategoryCreate) => {
        mutate(data)


    }

  return (
     <div className="max-w-2xl mx-auto mt-10">
    <form
        onSubmit={handleSubmit(handleCreate)}
        className="space-y-6 bg-white p-8 rounded-xl shadow-md"
        noValidate
      >
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre
          </label>
          <input
            type="text"
            placeholder="Ej: Camiseta deportiva"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 outline-none"
            {...register("name", { required: "El nombre es obligatorio" })}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
         <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-3 rounded-lg transition"
          >
            Crear Categoria
          </button>
        </div>
      </form>
      </div>
  )
}

export default CreateCategory

import uploadImage from '@/cloudinary/uploadImage'
import {useGetCategories} from '@/hooks/useCategories'
import { useCreateProduct } from '@/hooks/useProductsQuery'
import type { Category } from '@/schemas/category.schema'
import type { CreateProductForm, Product } from '@/schemas/product.schema'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'


interface CreateProductProps {
  onClose: () => void,
  productToEdit: Product | null
}


const ProductForm = ({onClose, productToEdit}: CreateProductProps) => {
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const isEditing = !!productToEdit
  console.log(isEditing)


  const initialValues: CreateProductForm = {
    name: '',
    description: '',
    price: 0,
    stock: 0,
    image: '',
    categoryId: 0
  }

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateProductForm>({
    defaultValues: productToEdit ? productToEdit : initialValues
  });


  useEffect(() => {
    if (isEditing) {
      reset(productToEdit)
      setPreview(productToEdit?.image || null)
      
    } else {
      reset(initialValues)
      setPreview(null)
    }
    
  }, [isEditing, productToEdit, reset])
  

  const { mutate } = useCreateProduct()

  const handleCreate = async (formData: CreateProductForm) => {
    if (!image) return

    const imageUrl = await uploadImage(image)
    const finalImageurl = imageUrl.imageUrl

    mutate({
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      categoryId: Number(formData.categoryId),
      image: finalImageurl
    })

    reset()
    setImage(null)
    setPreview(null)
  }

  const { data: categories } = useGetCategories()
  console.log(categories)

  const handleImageChange = (file: File | null) => {
    setImage(file)
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {isEditing ? "Editar Producto" : "Crear nuevo producto"}
        
      </h1>

      <div className="max-w-2xl relative"> 
      {/* --- BOTÓN DE CERRAR --- */}
      <button 
        type="button" // Importante para que no envíe el formulario
        onClick={onClose} 
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
      >
        {/* Usamos un SVG para un ícono de 'X' más nítido */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

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

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio
          </label>
          <input
            type="number"
            placeholder="Ej: 1200"
            min={0}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 outline-none"
            {...register("price", { required: "El precio es obligatorio", min:{ value: 1, message: "El precio debe ser mayor a cero" } })}
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>

        {/* Descripcion */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <textarea
            rows={3}
            placeholder="Detalles del producto..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 outline-none resize-none"
            {...register("description", { required: "La descripción es obligatoria" })}
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        {/* Imagen */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Imagen
          </label>
          <input
            type="file"
            className="w-full text-sm text-gray-600
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-fuchsia-100 file:text-fuchsia-700
                       hover:file:bg-fuchsia-200"
            {...register("image", { required: "La imagen es obligatoria" })}
            onChange={(e) => handleImageChange(e.target.files?.[0] ?? null)}
          />
          {preview && (
            <>
            <div className="mt-3">
              <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded-lg shadow" />
            </div>
            <button
            type="button"
            onClick={() => {
              setImage(null)
              setPreview(null)
            }}
            className="mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition"
          >
            Eliminar imagen
          </button>
            </>
          )}
          {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
        </div>

        {/* Stock */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stock
          </label>
          <input
            type="number"
            placeholder="Ej: 50"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 outline-none"
            {...register("stock", { required: "El stock es obligatorio", min: { value: 1, message: "El stock debe ser mayor a cero" } })}
          />
          {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
        </div>

        {/* Categoria */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoría
          </label>
          {/* <input
            type="number"
            placeholder="Ej: 1"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 outline-none"
            {...register("categoryId", { required: "La categoría es obligatoria", min: 0 })}
          />
          {errors.categoryId && <p className="text-red-500 text-sm">{errors.categoryId.message}</p>} */}
          <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 outline-none"
            {...register("categoryId", { required: "La categoría es obligatoria", min: { value: 1, message: "La categoria seleccionada no existe"} })}
            onChange={(e) => console.log(e.target)}
          >
            <option value={0}> Selecciona una categoría </option>
            {categories?.map((category: Category) => (
              <option key={category.id} value={category.id}> {category.name} </option>
            ))}

          </select>
          {errors.categoryId && <p className="text-red-500 text-sm">{errors.categoryId.message}</p>}
        </div>

        {/* Botón */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-3 rounded-lg transition"
          >
            {isEditing ? "Guardar Cambios" : "Crear Producto"}
           
          </button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default ProductForm

import uploadImage from '@/cloudinary/uploadImage'
import { useCreateProduct } from '@/hooks/useProductsQuery'
import type { CreateProductForm } from '@/schemas/product.schema'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const CreateProduct = () => {

  const [image, setimage] = useState<File | null >(null)

    const initialValues: CreateProductForm = {
        name: '',
        description: '',
        price: 0,
        stock: 0,
        image: '',
        categoryId: 0

    }

    const { register, handleSubmit, reset, formState: { errors }} = useForm<CreateProductForm>({
        defaultValues:initialValues
    });
    const { mutate } = useCreateProduct()

    const handleCreate = async (formData: CreateProductForm) => {
      if (!image) {
        return 
      }
       const imageUrl = await uploadImage(image as File)
       const finalImageurl = imageUrl.imageUrl
        console.log(formData)
        mutate({
          ...formData,
          price: Number(formData.price), 
        stock: Number(formData.stock), 
        categoryId: Number(formData.categoryId), 
          image: finalImageurl
        })
        reset()
        

    }

   return (
    <div className="max-w-3xl mx-auto mt-10 px-4">

      <form
        onSubmit={handleSubmit(handleCreate)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 mt-8 rounded-md shadow"
        noValidate
      >
        {/* Name */}
        <div>
          <label className="font-semibold block mb-1 text-gray-700">
            Nombre 
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            {...register("name", {
              required: "El Nombre es obligatorio",
              
            })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="font-semibold block mb-1 text-gray-700">
            Precio
          </label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded"
            {...register("price", {
              required: "El precio es obligatorio",
            })}
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>

        {/* Descripcion */}
        <div>
          <label className="font-semibold block mb-1 text-gray-700">
            Descripcion
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            {...register("description", {
              required: "La descripcion es obligatoria",
            })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Image */}
        <div>
          <label className="font-semibold block mb-1 text-gray-700">
            Imagen
          </label>
          <input
            type="file"
            className="w-full p-2 border border-gray-300 rounded"
            {...register("image", {
              required: "La imagen es obligatoria",
            })}
            onChange={(e) => setimage(e.target.files?.[0] ?? null)}
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
        </div>

        {/* Stock */}
        <div>
          <label className="font-semibold block mb-1 text-gray-700">
            Stock
          </label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded"
            {...register("stock", {
              required: "El Stock es obligatorio",
              min: 0,
             
              
            })}
          />
          {errors.stock && (
            <p className="text-red-500 text-sm">{errors.stock.message}</p>
          )}
        </div>
        {/* Categoria */}
        <div>
          <label className="font-semibold block mb-1 text-gray-700">
            Categoria
          </label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded"
            {...register("categoryId", {
              required: "El numero de categoria es obligatorio",
              min: 0,
             
              
            })}
          />
          {errors.categoryId && (
            <p className="text-red-500 text-sm">{errors.categoryId.message}</p>
          )}
        </div>


        {/* Botón de envío (ocupa 2 columnas) */}
        <div className="md:col-span-2">
          <input
            type="submit"
            value="Crear Producto"
            className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full text-white font-bold py-3 rounded cursor-pointer transition-colors"
          />
        </div>
      </form>
      
    </div>
  );
}

export default CreateProduct

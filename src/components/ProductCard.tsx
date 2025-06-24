import type { Product } from "@/schemas/product.schema"
import ProductActions from "./ProductActions"

type ProductCardProps = {
    data: Product []
}


const ProductCard = ( {data}: ProductCardProps) => {
  return (
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
         {
              data?.map(product => (
                <div key={product.id} className="group relative border p-4 rounded-md shadow hover:shadow-lg transition">
                  <img
                    src={product.image?.trim() 
                        ? product.image 
                        : "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg"}


                    alt={product.name}
                    className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75"
                  />
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700 font-semibold">
                        {product.name}
                      </h3>
                       <p className="text-sm font-medium text-gray-900">Stock: {product.stock}</p>
                    <p className="text-sm font-medium text-gray-900">Descripcion: {product.description}</p>
                      <p className="mt-1 text-sm text-gray-500">Categoría: {product.categoryName}</p>
                      
                      
                    </div>
                    <p className="text-sm font-medium text-gray-900">${product.price}</p>
                   
                  </div>
                  <div className="mt-4 flex gap-4 justify-center">
                    {}
                    <div
                     
                    
                    ><ProductActions
                   
                      product={product}/>
                    </div>
                   
                  </div>
                </div>
              ))
            }
           

      
    </div>
  )
}

export default ProductCard

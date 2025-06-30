import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import useProductsQuery from "@/features/products/useProductsQuery";
import { useState } from "react";


const Products = () => {

  const [page, setPage] = useState(0)

  const { data, isLoading, isError, error } = useProductsQuery(page);


 

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}

      <h3 className="text-2xl font-black mt-7">Productos</h3>
     
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* ✅ Contenedor de las cards */}
         
           <ProductCard
             data={data?.content || []}
           />
           {/* <ProductExample
              data={data?.content || []}
           /> */}
        
            <Pagination
              currentPage={ page }
              totalPages={data?.totalPages || 1}
              onPageChange={(newpage) => {setPage(newpage)}}

            />
        </div>
      </div>
    </div>
  )
}


export default Products;

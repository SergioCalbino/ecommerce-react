import Pagination from "@/components/Pagination";
import ProductGrid from "@/components/ProductGrid";

import useDebounce from "@/hooks/useDebounce";
import { useProductsQuery } from "@/hooks/useProductsQuery";
import type { Product } from "@/schemas/product.schema";
import { useEffect, useState } from "react";

export interface ProductsProps {
  searchTerm: string;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (product: Product) => void;
  onReactivateProduct: (product: Product) => void;
}

const Products = ({ searchTerm, onEditProduct, onDeleteProduct, onReactivateProduct }: ProductsProps) => {
  const [page, setPage] = useState(0);
  const debounceSearchTerm = useDebounce(searchTerm, 500);
  
  // Usamos 12 para que la grilla se vea completa (múltiplo de 2, 3 y 4)
  const size = 12;

  const { data, isLoading, isError, error } = useProductsQuery(
    page,
    size,
    debounceSearchTerm
  );

  useEffect(() => {
    setPage(0);
  }, [debounceSearchTerm]);

  return (
    <div>
      {isLoading && <p className="text-center p-4">Cargando productos...</p>}
      {isError && <p className="text-center p-4 text-red-500">Error: {error.message}</p>}

      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <ProductGrid data={data?.content || []} onEditProduct={onEditProduct} onDeleteProduct={onDeleteProduct} onReactivateProduct={onReactivateProduct} />

          <Pagination
            currentPage={page}
            totalPages={data?.totalPages || 1}
            onPageChange={(newpage) => {
              setPage(newpage);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
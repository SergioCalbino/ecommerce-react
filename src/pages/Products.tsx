import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import useDebounce from "@/hooks/useDebounce";
import { useProductsQuery } from "@/hooks/useProductsQuery";
import { useEffect, useState } from "react";

const Products = ({ searchTerm }: { searchTerm: string }) => {
  console.log(searchTerm);

  const [page, setPage] = useState(0);
  const debounceSearchTerm = useDebounce(searchTerm, 500);
  const size = 8;

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
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}

      <h3 className="text-2xl font-black mt-7">Productos</h3>

      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* ✅ Contenedor de las cards */}

          <ProductCard data={data?.content || []} />
          {/* <ProductExample
              data={data?.content || []}
           /> */}

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

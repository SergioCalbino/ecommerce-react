import { createProductApi, getProducts } from "@/api/Products";
import type { CreateProductForm, ProductPage } from "@/schemas/product.schema";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";

const useProductsQuery = (page: number = 0, size: number = 8, debounceSearchTerm: string) => {
  return useQuery<ProductPage>({
    queryKey: ["products", page, size, debounceSearchTerm],
    queryFn: () => getProducts(page, size, debounceSearchTerm),
    // keepPreviousData: true,
  });
};

const useCreateProduct = () => {
  return useMutation({
    mutationFn: (formData: CreateProductForm) => createProductApi(formData),

    onError: (error: AxiosError<{ messages?: Record<string, string> }>) => {
      const data = error.response?.data;
      if (data?.messages && typeof data.messages === "object") {
        Object.values(data.messages).forEach((msg) => {
          toast.error(msg);
        });
      } else {
        toast.error("Error desconocido");
      }
    },
    onSuccess: (data) => {
      toast.success("Producto creado de forma correcta");
      return data;
    },
  });
};

export { useProductsQuery, useCreateProduct };

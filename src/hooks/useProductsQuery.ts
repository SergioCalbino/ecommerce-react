import { createProductApi, deleteProductApi, getProducts, reactivateProduct, updateProductApi } from "@/api/Products";
import type { CreateProductForm, ProductPage } from "@/schemas/product.schema";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useAuth } from "./useAuth";

const useProductsQuery = (page: number = 0, size: number = 8, debounceSearchTerm: string) => {

  const { user } = useAuth();

  return useQuery<ProductPage>({
    queryKey: ["products", page, size, debounceSearchTerm, user?.role],
    queryFn: () => getProducts(page, size, debounceSearchTerm, user?.role),
    // keepPreviousData: true,
    enabled: !!user,
  });
};

const useCreateProduct = () => {
  const queryClient = useQueryClient()

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
      queryClient.invalidateQueries({ queryKey: ["products"] });
      return data;
    },
  });
};

const useUpdateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({formData, productId}: {formData: CreateProductForm, productId: number}) => updateProductApi(formData, productId),
    onError: (error: AxiosError<{messages?: Record<string, string>}>) => {
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
      toast.success("Producto actualizado de forma correcta");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      return data;
    },
    
  });
}

const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: number) => deleteProductApi(productId),
    onError: (error: AxiosError<{messages?: Record<string, string>}>) => {
      const data = error.response?.data;
      if (data?.messages && typeof data.messages === "object") {
        Object.values(data.messages).forEach((msg) => {
          toast.error(msg);
        });
        return
      } else {
        toast.error("Error desconocido");
        return
      }
    },
    onSuccess: () => {
      toast.success("Producto eliminado de forma correcta");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      return
    },
  });
}

const useReactivateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: number) => reactivateProduct(productId),
    onError: (error: AxiosError<{messages?: Record<string, string>}>) => {
      const data = error.response?.data;
      if (data?.messages && typeof data.messages === "object") {
        Object.values(data.messages).forEach((msg) => {
          toast.error(msg);
        });
      } else {
        toast.error("Error desconocido");
      }
    },
    onSuccess: () => {
      toast.success("Producto reactivado de forma correcta");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export { useProductsQuery, useCreateProduct, useUpdateProduct, useDeleteProduct, useReactivateProduct };

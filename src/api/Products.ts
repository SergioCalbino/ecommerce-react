import {
  productPageSchema,
  type CreateProductForm,
} from "@/schemas/product.schema";
import api from "./axios_client/api";

export async function getProducts(page: number = 0, size: number = 8, searchTerm?: string) {

  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  })

  if (searchTerm){

    params.append("name", searchTerm)
  }

  const response = await api.get(`/api/products?${params.toString()}`);
  return productPageSchema.parse(response.data);
}

export async function createProductApi(formData: CreateProductForm) {
  try {
    const response = await api.post(`/api/products`, formData);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

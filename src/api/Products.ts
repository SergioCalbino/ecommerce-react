import {
  productPageSchema,
  type CreateProductForm,
  type UpdateProductForm,
} from "@/schemas/product.schema";
import api from "./axios_client/api";

export async function getProducts(page: number = 0, size: number = 8, searchTerm?: string, role?: string) {

  console.log("Role in getProducts:", role);

  const baseUrl = role === "ADMIN" ? '/api/products/admin' : '/api/products/customer'

  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  })

  if (searchTerm){

    params.append("name", searchTerm)
  }

  const response = await api.get(`${baseUrl}?${params.toString()}`);
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

export async function updateProductApi(formData:UpdateProductForm, productId: number) {
  try {
    const response = await api.put(`/api/products/${productId}`, formData)
    return response;
    
  } catch (error) {
    console.log(error)
    throw error
    
  }
  
}

export async function deleteProductApi(productId:number) {
   try {
    const response = await api.delete(`/api/products/${productId}`)
    console.log(response)
    return response;
    
  } catch (error) {
    console.log(error)
    throw error
    
  }
  
}

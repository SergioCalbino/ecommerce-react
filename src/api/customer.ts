import type { CustomerUpdate } from "@/schemas/customer.schema";
import api from "./axios_client/api";

export async function myProfile() {
  const { data } = await api.get("/api/customer/my-profile");
  return data;
}

export async function updateProfile(formData: CustomerUpdate) {
  const { data } = await api.post("/api/customer/update", formData);
  return data;
}

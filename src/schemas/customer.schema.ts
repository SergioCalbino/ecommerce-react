import { z } from "zod";
import { orderBaseSchema } from "./order.schema";

export const customerSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  email: z.string().email(),
  password: z.string().optional(),
  address: z.string().optional(),
  orders: orderBaseSchema.array().optional(),
  telephone: z.string().optional(),
});

//Este schema es para el checkout
export const checkoutStepOneSchema = customerSchema.pick({
  id: true,
  name: true,
  email: true,
  telephone: true,
  address: true,
});

export const customerUpdate = customerSchema.pick({
  name: true,
  email: true,
  telephone: true,
  address: true,
});

export const changePasswordCustomer = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
  repeatPassword: z.string(),
});

export type Customer = z.infer<typeof customerSchema>;
export type CheckOutStepOne = z.infer<typeof checkoutStepOneSchema>;
export type CustomerUpdate = z.infer<typeof customerUpdate>;
export type CustomerChangePassword = z.infer<typeof changePasswordCustomer>;

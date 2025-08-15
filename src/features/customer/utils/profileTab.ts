export const ProfileTab = {
  PROFILE: "profile",
  SECURITY: "security",
  CART: "cart",
  ORDERS: "orders",
} as const;

export type ProfileTab = typeof ProfileTab[keyof typeof ProfileTab]
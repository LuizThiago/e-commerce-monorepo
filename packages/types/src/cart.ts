import type { Product } from "@repo/product-db";
import z from "zod";

export type CartItemType = Product & {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
};

export type CartItemsType = CartItemType[];

export const shippingFormScheme = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters long"),
  address: z.string().min(5, "Address must be at least 5 characters long"),
  email: z.email("Invalid email address"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits long")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  city: z.string().min(2, "City must be at least 2 characters long"),
});

export type ShippingFormInputs = z.infer<typeof shippingFormScheme>;

export type CartStoreStateType = {
  cart: CartItemsType;
  hasHydrated: boolean;
};

export type CartStoreActionsType = {
  addToCart: (item: CartItemType) => void;
  removeFromCart: (item: CartItemType) => void;
  clearCart: () => void;
};

export type PaymentFormType = {
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  cardHolderName: string;
};

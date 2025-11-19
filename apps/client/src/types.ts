import { email, z } from "zod";

export type ProductType = {
  id: string | number;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  sizes: [string, ...string[]];
  colors: [string, ...string[]];
  images: Record<string, string>;
};

export type ProductsType = ProductType[];

export type CartItemType = ProductType & {
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

export type ShippingFormType = z.infer<typeof shippingFormScheme>;

export const paymentFormScheme = z.object({
  cardHolderName: z
    .string()
    .min(2, "Card holder name must be at least 2 characters long"),
  cardNumber: z
    .string()
    .min(16, "Card number must be at least 16 characters long")
    .regex(/^\d+$/, "Card number must contain only digits"),
  expirationDate: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/\d{2}$/,
      "Expiration date must be in MM/YY format"
    ),
  cvv: z
    .string()
    .min(3, "CVV must be at least 3 digits long")
    .max(4, "CVV must be at most 4 digits long")
    .regex(/^\d+$/, "CVV must contain only digits"),
});

export type PaymentFormType = z.infer<typeof paymentFormScheme>;

export type CartStoreStateType = {
  cart: CartItemsType;
  hasHydrated: boolean;
};

export type CartStoreActionsType = {
  addToCart: (item: CartItemType) => void;
  removeFromCart: (item: CartItemType) => void;
  clearCart: () => void;
};

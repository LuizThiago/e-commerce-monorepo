import { CartStoreActionsType, CartStoreStateType } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useCartStore = create<CartStoreStateType & CartStoreActionsType>()(
  persist(
    (set) => ({
      cart: [],
      hasHydrated: false,
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cart.findIndex(
            (cartItem) =>
              cartItem.id === item.id &&
              cartItem.selectedSize === item.selectedSize &&
              cartItem.selectedColor === item.selectedColor
          );

          if (existingItem !== -1) {
            const updatedCart = [...state.cart];
            updatedCart[existingItem].quantity += item.quantity || 1;
            return { cart: updatedCart };
          }

          return { cart: [...state.cart, { ...item }] };
        }),
      removeFromCart: (item) =>
        set((state) => ({
          cart: state.cart.filter(
            (cartItem) =>
              !(
                cartItem.id === item.id &&
                cartItem.selectedSize === item.selectedSize &&
                cartItem.selectedColor === item.selectedColor
              )
          ),
        })),
      clearCart: () =>
        set(() => ({
          cart: [],
        })),
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hasHydrated = true;
        }
      },
    }
  )
);

export default useCartStore;

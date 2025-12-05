"use client";

import { useAuth } from "@clerk/nextjs";
import { CheckoutProvider } from "@stripe/react-stripe-js/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import { CartItemsType, ShippingFormInputs } from "@repo/types";
import useCartStore from "@/stores/cartStore";

const stripe = loadStripe(
  "pk_test_51Saivk8SyP29Ndkux4gnhh6511BPTS0ZrSqEDlhiuIImFCTx7WjPNjqxVg3dPpZoGPA8LpK1KVamLFEdk4ttrIJd00tWfrVztV"
);

const clientSecret = async (cart: CartItemsType, token: string) =>
  fetch(
    `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/create-checkout-session`,
    {
      method: "POST",
      body: JSON.stringify({ cart }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => response.json())
    .then((json) => json.checkoutSessionClientSecret);

const StripePaymentForm = ({
  shippingForm,
}: {
  shippingForm: ShippingFormInputs;
}) => {
  const { cart } = useCartStore();
  const [token, setToken] = useState<string | null>(null);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchToken = async () => {
      const t = await getToken();
      setToken(t);
    };

    fetchToken();
  }, [getToken]);

  if (!token) {
    return null;
  }

  return (
    <CheckoutProvider
      stripe={stripe}
      options={{ clientSecret: clientSecret(cart, token) }}
    >
      <CheckoutForm shippingForm={shippingForm} />
    </CheckoutProvider>
  );
};

export default StripePaymentForm;

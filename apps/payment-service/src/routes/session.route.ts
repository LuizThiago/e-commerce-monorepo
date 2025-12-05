import { Hono } from "hono";
import stripe from "../utils/stripe";
import { shouldBeUser } from "../middleware/authMiddleware";

const sessionRoute = new Hono();

sessionRoute.post("/create-checkout-session", shouldBeUser, async (c) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "T-shirt",
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      ui_mode: "custom",
      // The URL of your payment completion page
      return_url:
        "https://localhostÇ3002/return?session_id={CHECKOUT_SESSION_ID}",
    });
    return c.json({ checkoutSessionClientSecret: session.client_secret });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

export default sessionRoute;

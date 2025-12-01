import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { uptime } from "process";
import stripe from "./utils/stripe";
const app = new Hono();

app.use("*", clerkMiddleware());

app.get("/health", (c) => {
  return c.json({
    service: "payment-service",
    status: "ok",
    uptime: uptime(),
    timestamp: Date.now(),
  });
});

app.post("/create-stripe-product", async (c) => {
  const res = await stripe.products.create({
    id: "123",
    name: "Sample Product",
    default_price_data: {
      currency: "usd",
      unit_amount: 2000,
    },
  });

  return c.json(res);
});

app.get("/stripe-product-price", async (c) => {
  const res = await stripe.prices.list({
    product: "123",
  });

  return c.json(res);
});

const start = async () => {
  try {
    await serve({
      fetch: app.fetch,
      port: 8002,
    });
    console.log("Payment service is running on port 8002");
  } catch (error) {
    console.error("Failed to start payment service:", error);
    process.exit(1);
  }
};

start();

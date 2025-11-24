import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { uptime } from "process";
import { shouldBeUser } from "./middleware/authMiddleware.js";

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

app.get("/test", shouldBeUser, (c) => {
  return c.json({
    message: "Payment service is operational",
    userId: c.get("userId"),
  });
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

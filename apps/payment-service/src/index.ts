import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { uptime } from "process";

const app = new Hono();

app.get("/health", (c) => {
  return c.json({
    service: "payment-service",
    status: "ok",
    uptime: uptime(),
    timestamp: Date.now(),
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

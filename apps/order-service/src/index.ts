import fastify from "fastify";
import { clerkPlugin, getAuth } from "@clerk/fastify";
import { shouldBeUser } from "./middleware/authMiddleware.js";
import { connectOrderDB } from "@repo/order-db";
import { orderRoute } from "./routes/order.js";

const app = fastify({ logger: false });

app.register(clerkPlugin);

app.get("/health", async (request, reply) => {
  return reply.send({
    service: "order-service",
    status: "ok",
    timestamp: Date.now(),
    uptime: process.uptime(),
  });
});

app.get("/test", { preHandler: shouldBeUser }, (req, res) => {
  return res
    .status(200)
    .send({ message: "Order service authenticated", userId: req.userId });
});

app.register(orderRoute);

const start = async () => {
  try {
    await connectOrderDB();
    await app.listen({ port: 8001 });
    console.log("Order service is running on port 8001");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();

import Fastify from "fastify";
import { clerkPlugin, getAuth } from "@clerk/fastify";
import { shouldBeUser } from "./middleware/authMiddleware.js";

const app = Fastify({ logger: false });

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

const start = async () => {
  try {
    await app.listen({ port: 8001 });
    console.log("Order service is running on port 8001");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

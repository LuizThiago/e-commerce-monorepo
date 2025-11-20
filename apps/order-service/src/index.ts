import Fastify from "fastify";

const app = Fastify({ logger: false });

app.get("/health", async (request, reply) => {
  return reply.send({
    service: "order-service",
    status: "ok",
    timestamp: Date.now(),
    uptime: process.uptime(),
  });
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

import { FastifyInstance } from "fastify";
import { shouldBeAdmin, shouldBeUser } from "../middleware/authMiddleware";
import { Order } from "@repo/order-db";

export const orderRoute = async (fastify: FastifyInstance) => {
  fastify.get(
    "/user-orders",
    { preHandler: shouldBeUser },
    async (request, reply) => {
      const order = await Order.find({ userId: request.userId });
      return reply.send(order);
    }
  );

  fastify.get(
    "/orders",
    { preHandler: shouldBeAdmin },
    async (request, reply) => {
      const order = await Order.find();
      return reply.send(order);
    }
  );
};

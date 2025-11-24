import { FastifyReply, FastifyRequest } from "fastify";
import { getAuth } from "@clerk/fastify";

declare module "fastify" {
  interface FastifyRequest {
    userId?: string;
  }
}

export const shouldBeUser = async (req: FastifyRequest, res: FastifyReply) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).send("Unauthorized");
  }

  req.userId = userId;
};

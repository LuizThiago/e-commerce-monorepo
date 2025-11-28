import { FastifyReply, FastifyRequest } from "fastify";
import { getAuth } from "@clerk/fastify";
import { CustomJwtSessionClaims } from "@repo/types";

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

export const shouldBeAdmin = async (req: FastifyRequest, res: FastifyReply) => {
  const auth = getAuth(req);
  if (!auth.userId) {
    return res.status(401).send("You are not logged in");
  }

  const claims = auth.sessionClaims as CustomJwtSessionClaims;

  if (claims.metadata?.role !== "admin") {
    return res.status(403).send("Forbidden - Admins only");
  }

  req.userId = auth.userId;
};

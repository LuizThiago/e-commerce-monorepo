import { getAuth } from "@hono/clerk-auth";
import { createMiddleware } from "hono/factory";
import { CustomJwtSessionClaims } from "@repo/types";

export const shouldBeUser = createMiddleware<{
  Variables: {
    userId: string;
  };
}>(async (c, next) => {
  const auth = getAuth(c);
  if (!auth?.userId) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  c.set("userId", auth.userId);

  const claims = auth.sessionClaims as CustomJwtSessionClaims;

  if (claims.metadata?.role !== "admin") {
    return c.json({ error: "Forbidden - Admins only" }, 403);
  }

  await next();
});

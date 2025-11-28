import { getAuth } from "@clerk/express";
import { Request, Response, NextFunction } from "express";
import { CustomJwtSessionClaims } from "@repo/types";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const shouldBeUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reqAuth = getAuth(req);
  const userId = reqAuth?.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  req.userId = userId;
  next();
};

export const shouldBeAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reqAuth = getAuth(req);
  const userId = reqAuth?.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const claims = reqAuth.sessionClaims as CustomJwtSessionClaims;

  if (claims.metadata?.role !== "admin") {
    return res.status(403).json({ message: "Forbidden - Admins only" });
  }

  req.userId = userId;
  next();
};

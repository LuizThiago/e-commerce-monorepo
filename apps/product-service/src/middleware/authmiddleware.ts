import { getAuth } from "@clerk/express";
import { Request, Response, NextFunction } from "express";

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

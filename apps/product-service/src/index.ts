import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import productRouter from "./routes/product.route";
import categoryRouter from "./routes/category.route";
import { shouldBeUser } from "./middleware/authmiddleware";

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use(
  cors({
    origin: ["http://localhost:3002", "http://localhost:3003"],
    credentials: true,
  })
);
app.use(clerkMiddleware());

app.get("/test", shouldBeUser, (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Product service is operational!",
    userId: req.userId,
    bearerToken: req.headers.authorization,
  });
});

app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .send({ message: err.message || "Internal Server Error" });
});

app.listen(8000, () => {
  console.log("Product service is running on port 8000");
});

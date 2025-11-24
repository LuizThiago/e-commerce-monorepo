import express from "express";
import cors from "cors";
import { clerkMiddleware, getAuth } from "@clerk/express";
import { shouldBeUser } from "./middleware/authmiddleware.js";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3002", "http://localhost:3003"],
    credentials: true,
  })
);

app.use(clerkMiddleware());

app.get("/health", (req, res) => {
  res.send({
    service: "product-service",
    status: "ok",
    timestamp: Date.now(),
    uptime: process.uptime(),
  });
});

app.get("/test", shouldBeUser, (req, res) => {
  res.json({ message: "Product service authenticated", userId: req.userId });
});

app.listen(8000, () => {
  console.log("Product service is running on port 8000");
});

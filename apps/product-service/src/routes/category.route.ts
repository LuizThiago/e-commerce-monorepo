import { Router } from "express";

const router: Router = Router();

router.get("/test", (req, res) => {
  res.json({ message: "Categories route service is operational." });
});

export default router;

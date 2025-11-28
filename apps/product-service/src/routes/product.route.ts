import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller";
import { shouldBeAdmin } from "../middleware/authmiddleware";

const router: Router = Router();

router.post("/", shouldBeAdmin, createProduct);
router.put("/:id", shouldBeAdmin, updateProduct);
router.delete("/:id", shouldBeAdmin, deleteProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);

router.get("/test", (req, res) => {
  res.json({ message: "Products route service is operational." });
});

export default router;

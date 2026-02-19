import { Router } from "express";
import { requireAdmin } from "../middlewares/auth.middleware.js";
import {
  listProducts,
  getProduct,
  adminCreateProduct,
  adminUpdateProduct,
  adminDeleteProduct
} from "../controllers/product.controller.js";

const router = Router();

router.get("/", listProducts);
router.get("/:id", getProduct);

router.post("/", requireAdmin, adminCreateProduct);
router.put("/:id", requireAdmin, adminUpdateProduct);
router.delete("/:id", requireAdmin, adminDeleteProduct);

export default router;
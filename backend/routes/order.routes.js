import { Router } from "express";
import { requireAdmin } from "../middlewares/auth.middleware.js";
import {
  createOrder,
  getOrder,
  adminListOrders,
  adminUpdateOrderStatus
} from "../controllers/order.controller.js";

const router = Router();

router.post("/", createOrder);
router.get("/:id", getOrder);

router.get("/admin/all", requireAdmin, adminListOrders);
router.put("/admin/:id/status", requireAdmin, adminUpdateOrderStatus);

export default router;
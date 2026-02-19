import { Router } from "express";
import { requireAdmin } from "../middlewares/auth.middleware.js";
import {
  adminCreateOffer,
  adminListOffers,
  adminUpdateOffer,
  adminDeleteOffer,
  listActiveOffers
} from "../controllers/offer.controller.js";

const router = Router();

router.get("/active", listActiveOffers);

router.get("/", requireAdmin, adminListOffers);
router.post("/", requireAdmin, adminCreateOffer);
router.put("/:id", requireAdmin, adminUpdateOffer);
router.delete("/:id", requireAdmin, adminDeleteOffer);

export default router;
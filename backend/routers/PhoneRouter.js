import express from "express";
import {
  GetAllPhones,
  GetBrandsAndCountPhones,
  GetPhoneById,
  GetYears,
} from "../controllers/PhoneController.js";

const router = express.Router();

router.get("/", GetAllPhones);

router.get("/:id", GetPhoneById);

router.get("/brands/count", GetBrandsAndCountPhones);

router.get("/years/distinct", GetYears);

export default router;

import express from "express";
import {
  GetAllPhones,
  GetBrandsAndCountPhones,
  GetPhoneById,
  GetPriceAndAvailabilityOfDevice,
  GetYears,
  PhoneInStore,
} from "../controllers/PhoneController.js";

const router = express.Router();

router.get("/", GetAllPhones);

router.get("/:id", GetPhoneById);

router.get("/brands/count", GetBrandsAndCountPhones);

router.get("/years/distinct", GetYears);

router.get("/available/in", GetPriceAndAvailabilityOfDevice);

router.get("/available/by/store", PhoneInStore);

export default router;

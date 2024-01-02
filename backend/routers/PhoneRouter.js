import express from "express";
import {
  GetPhonesForSeller,
  CountPhones,
  GetAllPhones,
  GetBrands,
  GetBrandsAndCountPhones,
  GetPhoneById,
  GetPriceAndAvailabilityOfDevice,
  GetYears,
  PhoneInStore,
} from "../controllers/PhoneController.js";
import { VerifySeller, VerifyToken } from "../middlewares/RestrictAccess.js";

const router = express.Router();

router.get("/", GetAllPhones);

router.get("/:id", GetPhoneById);

router.get("/brands/count", GetBrandsAndCountPhones);

router.get("/brands/list", GetBrands);

router.get("/years/distinct", GetYears);

router.get("/available/in", GetPriceAndAvailabilityOfDevice);

router.get("/available/by/store", PhoneInStore);

router.get("/devices/count", CountPhones);

router.post(
  "/devices/for-seller",
  VerifyToken,
  VerifySeller,
  GetPhonesForSeller
);

export default router;

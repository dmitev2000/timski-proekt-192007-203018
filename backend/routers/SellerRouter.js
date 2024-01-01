import express from "express";
import { VerifySeller, VerifyToken } from "../middlewares/RestrictAccess.js";
import {
  AddOrUpdateDevice,
  GetOurCatalogue,
  UpdateStock,
} from "../controllers/SellerController.js";

const router = express.Router();

router.post("/catalogue", VerifyToken, VerifySeller, GetOurCatalogue);

router.post("/update-device", VerifyToken, VerifySeller, AddOrUpdateDevice);

router.put("/update-stock", VerifyToken, VerifySeller, UpdateStock);

export default router;

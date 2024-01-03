import express from "express";
import { GetShops } from "../controllers/ShopController.js";

const router = express.Router();

router.get("/", GetShops);

export default router;
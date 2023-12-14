import express from "express";
import { GetAllPhones, GetPhoneById } from "../controllers/PhoneController.js";

const router = express.Router();

router.get("/", GetAllPhones);

router.get("/:id", GetPhoneById);

export default router;

import express from "express";
import {
  AddProductToCart,
  EmptyCart,
  GetCartItems,
  RemoveItemFromCart,
} from "../controllers/CartController.js";
import { VerifyUser, VerifyToken } from "../middlewares/RestrictAccess.js";

const router = express.Router();

router.get("/cart-items/:user_id", VerifyToken, VerifyUser, GetCartItems);

router.post("/add/:user_id", VerifyToken, VerifyUser, AddProductToCart);

router.post("/remove/:user_id", VerifyToken, VerifyUser, RemoveItemFromCart);

router.delete("/empty-cart/:user_id", VerifyToken, VerifyUser, EmptyCart);

export default router;

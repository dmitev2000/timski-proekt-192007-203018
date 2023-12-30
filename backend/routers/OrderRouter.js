import express from "express";
import {
  GetOrderDetails,
  MyOrders,
  PlaceOrder,
} from "../controllers/OrderController.js";
import { VerifyToken, VerifyUser } from "../middlewares/RestrictAccess.js";

const router = express.Router();

router.post("/place-order/:user_id", VerifyToken, VerifyUser, PlaceOrder);

router.get("/my-orders/:user_id", VerifyToken, VerifyUser, MyOrders);

router.get("/order-details/:order_id/:user_id", GetOrderDetails);

export default router;

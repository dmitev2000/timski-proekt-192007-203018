import express from "express";
import {
  GetAllOrders,
  GetOrderDetails,
  GetRecentOrders,
  MyOrders,
  PlaceOrder,
} from "../controllers/OrderController.js";
import { VerifyToken, VerifyAdmin } from "../middlewares/RestrictAccess.js";

const router = express.Router();

router.post("/place-order", PlaceOrder);

router.get("/my-orders/:user_id", MyOrders);

router.get("/order-details/:order_id/:user_id", GetOrderDetails);

router.get("/recent-orders", VerifyToken, VerifyAdmin, GetRecentOrders);

router.get("/all-orders", VerifyToken, VerifyAdmin, GetAllOrders);

export default router;

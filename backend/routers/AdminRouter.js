import express from "express";
import {
  AddDeviceToDB,
  CountOrders,
  DeleteUsers,
  ExportToCSV,
  GetCustomers,
  GetLastWeekSales,
  GetUsers,
  TotalSales,
  VerifySellerAccount,
} from "../controllers/AdminController.js";
import { VerifyAdmin, VerifyToken } from "../middlewares/RestrictAccess.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "images/devices";
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get("/customers", VerifyToken, VerifyAdmin, GetCustomers);

router.get("/users", VerifyToken, VerifyAdmin, GetUsers);

router.get("/count-orders", VerifyToken, VerifyAdmin, CountOrders);

router.get("/total-sales", VerifyToken, VerifyAdmin, TotalSales);

router.delete("/users", VerifyToken, VerifyAdmin, DeleteUsers);

router.post(
  "/devices/add",
  VerifyToken,
  VerifyAdmin,
  upload.single("image"),
  AddDeviceToDB
);

router.put("/sellers/verify", VerifyToken, VerifyAdmin, VerifySellerAccount);

router.get("/export/csv", VerifyToken, VerifyAdmin, ExportToCSV);

router.get("/get/week-stats", VerifyToken, VerifyAdmin, GetLastWeekSales);

export default router;

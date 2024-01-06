import express from "express";
import {
  GetAdminRoleID,
  Login,
  Register,
  RegisterSellerWithNewShop,
} from "../controllers/AuthenticationController.js";
import multer from "multer";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadDir = "images/shop";
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//     console.log(file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

const router = express.Router();

router.post("/register", Register);

router.post("/login", Login);

router.post("/register-seller", RegisterSellerWithNewShop);

router.get("/admin-role-id", GetAdminRoleID);

export default router;

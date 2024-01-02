import express from "express";
import {
  GetAdminRoleID,
  Login,
  Register,
} from "../controllers/AuthenticationController.js";

const router = express.Router();

router.post("/register", Register);

router.post("/login", Login);

router.get("/admin-role-id", GetAdminRoleID);

export default router;

import express from "express";
import { login, refreshToken } from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/refresh", verifyToken, refreshToken);

export default router;

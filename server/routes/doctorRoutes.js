import express from "express";
import {
  getDoctors,
  createDoctor,
  deleteDoctor,
} from "../controllers/doctorController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getDoctors); // Herkes görebilir
router.post("/", verifyToken, createDoctor); // Sadece Admin ekler
router.delete("/:id", verifyToken, deleteDoctor); // Sadece Admin siler

export default router;

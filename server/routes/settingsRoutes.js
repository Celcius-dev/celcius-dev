import express from "express";
import {
  getSettings,
  updateSettings,
} from "../controllers/settingsController.js";

const router = express.Router();

// GET: Ayarları çek
router.get("/", getSettings);

// PUT: Ayarları güncelle (Tek bir ayar olduğu için ID'ye gerek yok)
router.put("/", updateSettings);

export default router;

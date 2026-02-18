import express from "express";
import Service from "../models/Service.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { z } from "zod";

const router = express.Router();

// Zod Schema
const serviceSchema = z.object({
  title: z.string().min(1, "Rubrik krävs"), // Başlık zorunlu
  icon: z.string().min(1, "Ikon krävs"), // İkon zorunlu
  summary: z.string().min(1, "Sammanfattning krävs"), // Özet zorunlu
  content: z.string().optional(),
});

// GET: Tüm Hizmetler (Kartlar için)
router.get("/", async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: "Ett fel uppstod", error: err });
  }
});

// GET: Tek Hizmet (Detay Sayfası için)
router.get("/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service)
      return res.status(404).json({ message: "Tjänsten hittades inte" });
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: "Ett fel uppstod", error: err });
  }
});

// POST: Yeni Hizmet Ekle (Korumalı + Validasyonlu)
router.post("/", verifyToken, async (req, res) => {
  try {
    // Validasyon
    const validatedData = serviceSchema.parse(req.body);

    const newService = new Service(validatedData);
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    res.status(500).json({ message: "Ett fel uppstod", error: err });
  }
});

// PUT: Güncelle (Korumalı + Validasyonlu)
router.put("/:id", verifyToken, async (req, res) => {
  try {
    // Validasyon (Kısmi güncelleme olabileceği için partial kullanabiliriz veya frontend'in her şeyi gönderdiğini varsayabiliriz. 
    // Mevcut yapıda form tüm veriyi gönderiyor, o yüzden direkt parse ediyoruz).
    const validatedData = serviceSchema.parse(req.body);

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      { $set: validatedData },
      { new: true }
    );
    res.json(updatedService);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    res.status(500).json({ message: "Ett fel uppstod", error: err });
  }
});

// DELETE: Sil (Korumalı)
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json("Tjänsten har tagits bort"); // Hizmet silindi
  } catch (err) {
    res.status(500).json({ message: "Ett fel uppstod", error: err });
  }
});

export default router;

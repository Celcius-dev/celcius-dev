import express from "express";
import Doctor from "../models/Doctor.js";
import upload from "../middleware/uploadMiddleware.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOADS_DIR = path.join(__dirname, "../uploads");

// GET: Tüm Doktorlar
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET: Tek Doktor
router.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    res.json(doctor);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST: Yeni Doktor Ekle
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, title, summary, content, imageFit } = req.body;
    const image = req.file ? req.file.filename : "";

    const newDoctor = new Doctor({
      name,
      title,
      summary,
      content,
      imageFit,
      image,
    });

    const savedDoctor = await newDoctor.save();
    res.status(201).json(savedDoctor);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT: Güncelle
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, title, summary, content, imageFit } = req.body;
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) return res.status(404).json("Doktor bulunamadı");

    doctor.name = name;
    doctor.title = title;
    doctor.summary = summary;
    doctor.content = content;
    doctor.imageFit = imageFit;

    if (req.file) {
      if (doctor.image) {
        // Eski resmi güvenli yoldan sil
        const oldImagePath = path.join(UPLOADS_DIR, doctor.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlink(oldImagePath, (err) => {
            if (err) console.log("Dosya silme hatası:", err);
          });
        }
      }
      doctor.image = req.file.filename;
    }

    const updatedDoctor = await doctor.save();
    res.json(updatedDoctor);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE: Sil
router.delete("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (doctor && doctor.image) {
      const imagePath = path.join(UPLOADS_DIR, doctor.image);
      if (fs.existsSync(imagePath)) {
        fs.unlink(imagePath, (err) => {
          if (err) console.log("Dosya silme hatası:", err);
        });
      }
    }
    await Doctor.findByIdAndDelete(req.params.id);
    res.json("Doktor silindi");
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;

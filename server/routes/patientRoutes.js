import express from "express";
import Patient from "../models/Patients.js";
import upload from "../middleware/uploadMiddleware.js"; // Mevcut upload ayarın
import fs from "fs";

const router = express.Router();

// GET: Tüm Hastalar
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });
    res.json(patients);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET: Tek Hasta
router.get("/:id", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    res.json(patient);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST: Yeni Hasta Ekle
router.post("/", upload.single("image"), async (req, res) => {
  try {
    // Tags string olarak gelir (örn: "Aşı, Bakım"), array'e çeviriyoruz
    const tagsArray = req.body.tags
      ? req.body.tags.split(",").map((t) => t.trim())
      : [];

    const newPatient = new Patient({
      ...req.body,
      tags: tagsArray,
      image: req.file ? req.file.filename : "",
    });

    const savedPatient = await newPatient.save();
    res.status(201).json(savedPatient);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT: Güncelle
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json("Hasta bulunamadı");

    // Mevcut verileri güncelle
    Object.assign(patient, req.body);

    // Tags güncellemesi
    if (req.body.tags) {
      patient.tags = req.body.tags.split(",").map((t) => t.trim());
    }

    // Resim güncellemesi
    if (req.file) {
      if (patient.image) {
        fs.unlink(`uploads/${patient.image}`, (err) => {
          if (err) console.log(err);
        });
      }
      patient.image = req.file.filename;
    }

    const updatedPatient = await patient.save();
    res.json(updatedPatient);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE: Sil
router.delete("/:id", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (patient?.image) {
      fs.unlink(`uploads/${patient.image}`, (err) => {
        if (err) console.log(err);
      });
    }
    await Patient.findByIdAndDelete(req.params.id);
    res.json("Hasta silindi");
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;

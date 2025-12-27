import express from "express";
import Service from "../models/Service.js";

const router = express.Router();

// GET: Tüm Hizmetler (Kartlar için)
router.get("/", async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET: Tek Hizmet (Detay Sayfası için)
router.get("/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    res.json(service);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST: Yeni Hizmet Ekle
router.post("/", async (req, res) => {
  try {
    const newService = new Service(req.body);
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT: Güncelle
router.put("/:id", async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedService);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE: Sil
router.delete("/:id", async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json("Hizmet silindi");
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;

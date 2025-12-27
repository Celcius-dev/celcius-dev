import Service from "../models/Service.js";

// HATA ÇÖZÜMÜ: 'const' yerine 'export const' yazıyoruz.

// Yeni Hizmet Ekleme
export const createService = async (req, res) => {
  try {
    const newService = new Service(req.body);
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Hizmetleri Getirme
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Silme işlemi
export const deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.status(200).json("Hizmet silindi.");
  } catch (err) {
    res.status(500).json(err);
  }
};

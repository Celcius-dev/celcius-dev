import Doctor from "../models/Doctor.js";

// Tüm hekimleri getir
export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 });
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Yeni hekim ekle (Admin)
export const createDoctor = async (req, res) => {
  try {
    const { name, title, specialty, image, bio } = req.body;
    const newDoctor = new Doctor({ name, title, specialty, image, bio });
    await newDoctor.save();
    res.status(201).json(newDoctor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Hekim sil (Admin)
export const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    await Doctor.findByIdAndDelete(id);
    res.status(200).json({ message: "Hekim başarıyla silindi." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

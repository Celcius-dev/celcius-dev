import Doctor from "../models/Doctor.js";

export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doktor bulunamadı" });
    res.status(200).json(doctor);
  } catch (error) {
    res.status(404).json({ message: "Doktor bulunamadı" });
  }
};

export const createDoctor = async (req, res) => {
  try {
    const { name, title, specialty, bio } = req.body;

    // Resim yüklendiyse yolunu al
    let imagePath = "";
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    // String gelen uzmanlık alanlarını Array'e çevir
    const specialtyArray = specialty
      ? specialty.split(",").map((item) => item.trim())
      : [];

    const newDoctor = new Doctor({
      name,
      title,
      specialty: specialtyArray,
      bio,
      image: imagePath,
    });

    await newDoctor.save();
    res.status(201).json(newDoctor);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateDoctor = async (req, res) => {
  try {
    const { name, title, specialty, bio } = req.body;

    let updateData = {
      name,
      title,
      bio,
      specialty: specialty
        ? specialty.split(",").map((item) => item.trim())
        : [],
    };

    // SADECE YENİ RESİM VARSA GÜNCELLE
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updated = await Doctor.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteDoctor = async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Doktor silindi" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

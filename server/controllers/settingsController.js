import SiteSettings from "../models/SiteSettings.js";

// Ayarları Getir
export const getSettings = async (req, res) => {
  try {
    // İlk bulduğu kaydı getir (Zaten 1 tane olacak)
    const settings = await SiteSettings.findOne();
    res.status(200).json(settings || {});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ayarları Güncelle (Yoksa oluşturur, varsa günceller)
export const updateSettings = async (req, res) => {
  try {
    // İlk kaydı bul, yoksa yeni oluştur (upsert: true)
    const settings = await SiteSettings.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });
    res.status(200).json(settings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

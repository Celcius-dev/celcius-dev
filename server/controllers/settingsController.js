import SiteSettings from "../models/SiteSettings.js";

// AYARLARI GETİR
export const getSettings = async (req, res) => {
  try {
    // İlk bulduğu ayarı getir
    let settings = await SiteSettings.findOne();

    // Eğer veritabanında hiç ayar yoksa, boş bir tane oluşturup onu gönder
    if (!settings) {
      settings = await SiteSettings.create({});
    }

    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: "Ayarlar çekilemedi", error });
  }
};

// AYARLARI GÜNCELLE
export const updateSettings = async (req, res) => {
  try {
    const updatedSettings = await SiteSettings.findOneAndUpdate(
      {},
      { $set: req.body }, // $set ile sadece gelen alanları güncelle
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
        strict: false, // İçerik (content) gibi yeni alanların kaydedilmesine izin ver
      }
    );

    res.status(200).json(updatedSettings);
  } catch (error) {
    res.status(500).json({ message: "Ayarlar güncellenemedi", error });
  }
};

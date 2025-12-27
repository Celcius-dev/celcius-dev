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
    // İlk bulduğunu güncelle, yoksa yeni oluştur (upsert: true)
    // new: true -> Güncellenmiş veriyi geri döndür
    const updatedSettings = await SiteSettings.findOneAndUpdate(
      {}, // Filtre yok, ilkini al
      req.body, // Gelen veriyi bas
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json(updatedSettings);
  } catch (error) {
    res.status(500).json({ message: "Ayarlar güncellenemedi", error });
  }
};

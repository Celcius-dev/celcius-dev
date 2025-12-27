import multer from "multer";
import path from "path";

// Depolama Ayarı
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Resimler 'server/uploads' klasörüne gidecek
  },
  filename: (req, file, cb) => {
    // Dosya ismi çakışmasın diye tarih ekliyoruz (örn: 17823123-kedi.jpg)
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Dosya Filtresi (Sadece Resim)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Sadece resim dosyası yüklenebilir!"), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;

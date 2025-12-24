import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Başlık
    image: { type: String, required: true }, // Resim URL'si veya yolu
    content: { type: String, required: true }, // İçerik (HTML veya düz metin)
    author: { type: String, default: "Admin" }, // Yazar (Opsiyonel)
  },
  {
    timestamps: true, // Otomatik olarak oluşturulma (createdAt) ve güncellenme (updatedAt) tarihlerini ekler
  }
);

export default mongoose.model("Blog", blogSchema);

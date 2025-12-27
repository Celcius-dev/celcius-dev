import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Örn: Mia
    breed: { type: String, required: true }, // Örn: Scottish Fold
    age: { type: String, required: true }, // Örn: 2 yaşında
    treatment: { type: String, required: true }, // Örn: Düzenli Aşı Takibi
    description: { type: String, required: true }, // Kısa açıklama

    // Resim
    image: { type: String },
    imageFit: { type: String, default: "cover", enum: ["cover", "contain"] },

    // Etiketler (Örn: ["Aşı", "Muayene"])
    tags: { type: [String], default: [] },

    // Tarihler (Metin olarak tutuyoruz esneklik için)
    lastVisit: { type: String, default: "Yeni" }, // Örn: 2 hafta önce
    nextVisit: { type: String, default: "Belirlenmedi" }, // Örn: 12 Mart
  },
  { timestamps: true }
);

export default mongoose.model("Patient", PatientSchema);

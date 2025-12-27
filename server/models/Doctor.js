import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Ad Soyad
    title: { type: String, required: true }, // Ünvan (Uzman Vet. Hekim)

    image: { type: String }, // Dosya adı buraya kaydedilecek (örn: 12345.jpg)

    // Resim Ayarı (Blogdaki gibi)
    imageFit: {
      type: String,
      default: "cover",
      enum: ["cover", "contain"],
    },

    summary: { type: String, required: false, maxLength: 200 }, // Kısa Biyografi
    content: { type: String, required: false }, // Detaylı Özgeçmiş (HTML)
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", DoctorSchema);

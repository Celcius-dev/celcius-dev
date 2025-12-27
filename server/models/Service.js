import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    // Kart Görünümü
    icon: { type: String, required: true, default: "Activity" }, // İkon adı (örn: 'Stethoscope')
    summary: { type: String, required: true, maxLength: 200 }, // Kısa açıklama

    // Detay Sayfası
    content: { type: String, required: true }, // Uzun HTML içerik
  },
  { timestamps: true }
);

export default mongoose.model("Service", ServiceSchema);

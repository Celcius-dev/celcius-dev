import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true }, // Örn: Başhekim, Uzman Veteriner
    specialty: { type: Array }, // Örn: ["Cerrahi", "Dahiliye"]
    image: { type: String }, // Fotoğraf URL
    bio: { type: String }, // Kısa özgeçmiş
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Doctor", doctorSchema);

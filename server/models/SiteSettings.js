import mongoose from "mongoose";

const SiteSettingsSchema = new mongoose.Schema(
  {
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
    address: { type: String, default: "" },

    // Sosyal Medya (Obje olarak tutalım)
    social: {
      facebook: { type: String, default: "" },
      instagram: { type: String, default: "" },
      twitter: { type: String, default: "" },
    },

    // Çalışma Saatleri (Obje olarak tutalım)
    hours: {
      weekdayStart: { type: String, default: "09:00" },
      weekdayEnd: { type: String, default: "18:00" },
      weekendStart: { type: String, default: "10:00" },
      weekendEnd: { type: String, default: "15:00" },
    },
  },
  { timestamps: true }
);

export default mongoose.model("SiteSettings", SiteSettingsSchema);

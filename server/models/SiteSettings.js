import mongoose from "mongoose";

const siteSettingsSchema = new mongoose.Schema({
  phone: { type: String },
  email: { type: String },
  address: { type: String },
  mapsEmbedUrl: { type: String }, // Google Maps iframe linki
  socialMedia: {
    instagram: { type: String },
    facebook: { type: String },
    twitter: { type: String },
  },
  remisUrl: { type: String }, // Remis Randevu Sistemi Linki
});

export default mongoose.model("SiteSettings", siteSettingsSchema);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true }, // Kullanıcı adı
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Şifre (Hashlenmiş olacak)
    role: { type: String, default: "admin" }, // Yetki (admin, editor vb.)
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);

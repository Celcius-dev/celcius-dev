import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Giriş Yap
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kullanıcıyı bul
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Användaren hittades inte." });

    // Şifreyi kontrol et
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Felaktigt lösenord." });

    // Token oluştur (Bu token giriş bileti olacak)
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res
      .status(200)
      .json({ token, user: { username: user.username, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

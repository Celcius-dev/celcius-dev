import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Kayıt Ol (İlk admini oluşturmak için kullanacağız, sonra bu route'u kapatabiliriz)
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Kullanıcı var mı kontrol et
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Bu email zaten kayıtlı." });

    // Şifreyi hashle (gizle)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Yeni kullanıcı oluştur
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "Admin başarıyla oluşturuldu." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Giriş Yap
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kullanıcıyı bul
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });

    // Şifreyi kontrol et
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Hatalı şifre." });

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

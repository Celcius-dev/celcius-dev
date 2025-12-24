import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // 1. Token'ı başlık (header) bilgisinden al
  const token = req.header("Authorization");

  // 2. Token yoksa reddet
  if (!token) {
    return res
      .status(401)
      .json({ message: "Erişim reddedildi. Token bulunamadı." });
  }

  try {
    // 3. Token'ı doğrula (Başında 'Bearer ' varsa temizle)
    const tokenClean = token.replace("Bearer ", "");

    const verified = jwt.verify(tokenClean, process.env.JWT_SECRET);

    // 4. Doğrulanan kullanıcıyı isteğe ekle (Böylece içeride kullanabiliriz)
    req.user = verified;

    // 5. Bir sonraki aşamaya geç
    next();
  } catch (error) {
    res.status(400).json({ message: "Geçersiz Token." });
  }
};

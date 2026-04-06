import { createContext, useState, useEffect, useContext } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Token'i doğrula ve yenile (Refresh Token)
  const refreshUserToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const res = await api.post("/auth/refresh");
      localStorage.setItem("token", res.data.token);
      setUser({ token: res.data.token, ...res.data.user });
    } catch (error) {
      // Süresi dolmuşsa veya hatalı token ise localStorage'dan temizle
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Sayfa açıldığında token'ı yenile
    refreshUserToken();

    // Sürekli açık kalan sayfada her 4 saatte bir (veya belirlediğiniz sürede) token'ı arka planda yenile
    // Örneğin 4 saat: 4 * 60 * 60 * 1000 = 14400000ms
    const interval = setInterval(() => {
      if (localStorage.getItem("token")) {
        refreshUserToken();
      }
    }, 14400000); 

    return () => clearInterval(interval);
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    setUser({ token: res.data.token, ...res.data.user });
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;

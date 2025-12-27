import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  FileText,
  Stethoscope,
  BriefcaseMedical,
  LogOut,
  Heart, // EKLENDİ: Mutlu Hastalar için
  Settings, // EKLENDİ: Ayarlar için
} from "lucide-react";

const AdminLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Menü Elemanları
  const menuItems = [
    { path: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
    { path: "/admin/blogs", label: "Blog Yönetimi", icon: FileText },
    { path: "/admin/doctors", label: "Hekimler", icon: Stethoscope },
    {
      path: "/admin/services",
      label: "Hizmet Yönetimi",
      icon: BriefcaseMedical,
    },

    // --- YENİ EKLENENLER ---
    { path: "/admin/patients", label: "Mutlu Hastalar", icon: Heart },
    { path: "/admin/settings", label: "Site Ayarları", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* --- SIDEBAR (SOL MENÜ) --- */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full z-10">
        {/* Başlık Alanı */}
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-blue-400">Veteriner Panel</h2>
          <p className="text-xs text-gray-400 mt-1">
            Hoşgeldin, {user?.username || "Admin"}
          </p>
        </div>

        {/* Navigasyon */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded transition duration-200
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md" // Aktif ise Mavi
                      : "hover:bg-slate-800 text-gray-300"
                  } // Pasif ise Gri
                `}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Alt Kısım: Çıkış Yap */}
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition shadow-sm font-medium"
          >
            <LogOut size={18} />
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* --- İÇERİK ALANI (SAĞ TARAF) --- */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        {/* Beyaz Kart Alanı */}
        <div className="bg-white p-6 rounded-lg shadow-sm min-h-[80vh] border border-gray-200">
          <Outlet /> {/* Sayfalar buraya yüklenecek */}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;

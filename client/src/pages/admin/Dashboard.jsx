import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import {
  Save,
  Phone,
  Mail,
  MapPin,
  Globe,
  Clock,
  FileText,
  Stethoscope,
} from "lucide-react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [settings, setSettings] = useState({
    phone: "",
    email: "",
    address: "",
    social: { facebook: "", instagram: "", twitter: "" },
    hours: {
      weekdayStart: "09:00",
      weekdayEnd: "18:00",
      weekendStart: "10:00",
      weekendEnd: "15:00",
    },
  });

  const [stats, setStats] = useState({ blogs: 0, doctors: 0 }); // İstatistikler için state
  const [loading, setLoading] = useState(false);

  // SAAT SEÇENEKLERİ
  const generateTimeOptions = () => {
    const times = [];
    for (let i = 8; i < 24; i++) {
      const hour = i < 10 ? `0${i}` : i;
      times.push(`${hour}:00`);
      times.push(`${hour}:30`);
    }
    return times;
  };
  const timeOptions = generateTimeOptions();

  // VERİLERİ ÇEK (Ayarlar + İstatistikler)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Ayarları Çek
        const settingsRes = await api.get("/settings");
        if (settingsRes.data) {
          // Backend'den gelen veri ile state'i eşle
          setSettings({
            phone: settingsRes.data.phone || "",
            email: settingsRes.data.email || "",
            address: settingsRes.data.address || "",
            social: {
              facebook: settingsRes.data.social?.facebook || "",
              instagram: settingsRes.data.social?.instagram || "",
              twitter: settingsRes.data.social?.twitter || "",
            },
            hours: {
              weekdayStart: settingsRes.data.hours?.weekdayStart || "09:00",
              weekdayEnd: settingsRes.data.hours?.weekdayEnd || "18:00",
              weekendStart: settingsRes.data.hours?.weekendStart || "10:00",
              weekendEnd: settingsRes.data.hours?.weekendEnd || "15:00",
            },
          });
        }

        // 2. İstatistikleri Çek
        const blogsRes = await api.get("/blogs");
        const doctorsRes = await api.get("/doctors");
        setStats({
          blogs: blogsRes.data.length,
          doctors: doctorsRes.data.length,
        });
      } catch (error) {
        console.error("Kunde inte hämta data", error);
        toast.error("Ett fel uppstod när panelinformationen laddades.");
      }
    };

    fetchData();
  }, []);

  // CHANGE HANDLERS
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      social: { ...prev.social, [name]: value },
    }));
  };

  const handleHoursChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      hours: { ...prev.hours, [name]: value },
    }));
  };

  // KAYDETME İŞLEMİ
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put("/settings", settings);
      toast.success("Webbplatsens inställningar har uppdaterats!");
    } catch (error) {
      console.error(error);
      toast.error("Inställningarna kunde inte sparas.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-4">
        Panelöversikt & Snabbinställningar
      </h1>

      {/* İSTATİSTİKLER (Dinamik) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 flex items-center justify-between">
          <div>
            <h3 className="text-blue-600 font-bold uppercase text-xs tracking-wider">
              Totalt Antal Blogginlägg
            </h3>
            <p className="text-4xl font-bold text-slate-800 mt-2">
              {stats.blogs}
            </p>
          </div>
          <FileText size={40} className="text-blue-200" />
        </div>

        <div className="bg-green-50 p-6 rounded-lg border border-green-100 flex items-center justify-between">
          <div>
            <h3 className="text-green-600 font-bold uppercase text-xs tracking-wider">
              Antal Veterinärer
            </h3>
            <p className="text-4xl font-bold text-slate-800 mt-2">
              {stats.doctors}
            </p>
          </div>
          <Stethoscope size={40} className="text-green-200" />
        </div>
      </div>

      {/* AYARLAR FORMU */}
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2 mb-6">
          <div className="bg-slate-800 text-white p-2 rounded">
            <Globe size={20} />
          </div>
          <h2 className="text-xl font-bold text-slate-800">
            Allmän Webbplatsinformation
          </h2>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* İletişim */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
                <Phone size={16} /> Telefonnummer
              </label>
              <input
                type="text"
                name="phone"
                value={settings.phone}
                onChange={handleChange}
                placeholder="+46 00 000 00 00"
                className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
                <Mail size={16} /> E-postadress
              </label>
              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                placeholder="info@klinik.se"
                className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
              <MapPin size={16} /> Adress
            </label>
            <input
              type="text"
              name="address"
              value={settings.address}
              onChange={handleChange}
              placeholder="Adressuppgifter..."
              className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Sosyal Medya */}
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider">
              Länkar till Sociala Medier
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="facebook"
                placeholder="Facebook URL"
                value={settings.social.facebook}
                onChange={handleSocialChange}
                className="border border-gray-300 rounded p-2 text-sm"
              />
              <input
                type="text"
                name="instagram"
                placeholder="Instagram URL"
                value={settings.social.instagram}
                onChange={handleSocialChange}
                className="border border-gray-300 rounded p-2 text-sm"
              />
              <input
                type="text"
                name="twitter"
                placeholder="Twitter/X URL"
                value={settings.social.twitter}
                onChange={handleSocialChange}
                className="border border-gray-300 rounded p-2 text-sm"
              />
            </div>
          </div>

          {/* Çalışma Saatleri */}
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider flex items-center gap-2">
              <Clock size={16} /> Öppettider
            </h3>
            <div className="grid grid-cols-1 gap-8">
              <div className="bg-white p-3 rounded border border-gray-200">
                <p className="text-sm font-bold text-gray-700 mb-2">
                  Måndag - Fredag (Vardagar)
                </p>
                <div className="flex items-center gap-2">
                  <select
                    name="weekdayStart"
                    value={settings.hours.weekdayStart}
                    onChange={handleHoursChange}
                    className="border p-2 rounded w-full"
                  >
                    {timeOptions.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <span>-</span>
                  <select
                    name="weekdayEnd"
                    value={settings.hours.weekdayEnd}
                    onChange={handleHoursChange}
                    className="border p-2 rounded w-full"
                  >
                    {timeOptions.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded w-full md:w-auto flex items-center justify-center gap-2 transition"
            >
              <Save size={20} />{" "}
              {loading ? "Sparar..." : "Uppdatera Inställningar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;

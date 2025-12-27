import { useState, useEffect } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";

const Settings = () => {
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    address: "",
    facebook: "",
    instagram: "",
    twitter: "",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get("/settings");
        setFormData({
          phone: res.data.phone || "",
          email: res.data.email || "",
          address: res.data.address || "",
          facebook: res.data.facebook || "",
          instagram: res.data.instagram || "",
          twitter: res.data.twitter || "",
        });
      } catch (error) {
        toast.error("Ayarlar yüklenemedi.");
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put("/settings", formData);
      toast.success("Bilgiler güncellendi!");
    } catch (error) {
      toast.error("Güncelleme başarısız.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">İletişim Ayarları</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Sol Kolon: Temel İletişim */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
            İletişim Bilgileri
          </h3>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Telefon Numarası
            </label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="0555 555 55 55"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Email Adresi
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Adres (Tek Satır)
            </label>
            {/* textarea yerine input kullandık */}
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        {/* Sağ Kolon: Sosyal Medya */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
            Sosyal Medya Linkleri
          </h3>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Facebook
            </label>
            <input
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="https://facebook.com/..."
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Instagram
            </label>
            <input
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="https://instagram.com/..."
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Twitter (X)
            </label>
            <input
              name="twitter"
              value={formData.twitter}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="https://twitter.com/..."
            />
          </div>
        </div>

        <div className="md:col-span-2 mt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700"
          >
            Kaydet
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;

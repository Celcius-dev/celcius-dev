import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api, { UPLOAD_URL } from "../../api/axios";
import { toast } from "react-toastify";
import { Save, ArrowLeft, Upload, User, Stethoscope } from "lucide-react";

const DoctorForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  // const UPLOAD_URL silindi, import edildi

  // Form Verileri (Sadece İsim ve Ünvan)
  const [formData, setFormData] = useState({
    name: "",
    title: "",
  });

  // Resim Yükleme State'leri
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // Düzenleme Modundaysak Verileri Çek
  useEffect(() => {
    if (isEditMode) {
      const fetchDoctor = async () => {
        try {
          const res = await api.get(`/doctors/${id}`);
          setFormData({
            name: res.data.name,
            title: res.data.title,
          });

          // Resim varsa önizlemeyi ayarla (Seed verisi mi Upload verisi mi kontrol et)
          if (res.data.image) {
            setPreviewUrl(
              res.data.image.startsWith("http")
                ? res.data.image
                : UPLOAD_URL + res.data.image
            );
          }
        } catch (error) {
          toast.error("Kunde inte hämta information om veterinären.");
        }
      };
      fetchDoctor();
    }
  }, [isEditMode, id]);

  // Dosya Seçilince Çalışır
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Tarayıcıda geçici önizleme oluştur
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Form Gönderilince
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Resim yükleyeceğimiz için JSON değil FormData kullanıyoruz
    const data = new FormData();
    data.append("name", formData.name);
    data.append("title", formData.title);

    if (selectedFile) {
      data.append("image", selectedFile);
    }

    try {
      if (isEditMode) {
        await api.put(`/doctors/${id}`, data);
        toast.success("Veterinären uppdaterades framgångsrikt!");
      } else {
        await api.post("/doctors", data);
        toast.success("Ny veterinär tillagd!");
      }
      navigate("/admin/doctors");
    } catch (error) {
      console.error(error);
      toast.error("Åtgärden misslyckades.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto pb-10">
      {/* Üst Başlık ve Geri Butonu */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-500 hover:text-gray-800 transition"
        >
          <ArrowLeft />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">
          {isEditMode ? "Redigera Veterinär" : "Lägg till ny veterinär"}
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 space-y-6"
      >
        {/* Ad Soyad */}
        <div>
          <label className="block text-gray-700 font-bold mb-2 flex items-center gap-2">
            <User size={18} className="text-blue-600" /> Namn & Efternamn
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="T.ex: Dr. Anna Svensson"
            required
          />
        </div>

        {/* Ünvan */}
        <div>
          <label className="block text-gray-700 font-bold mb-2 flex items-center gap-2">
            <Stethoscope size={18} className="text-blue-600" /> Titel / Specialitet
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="T.ex: Kirurgispecialist"
            required
          />
        </div>

        {/* Fotoğraf Yükleme Alanı */}
        <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300 hover:bg-gray-100 transition relative group text-center">
          <label className="block text-gray-700 font-bold mb-4 cursor-pointer">
            Profilbild
          </label>

          <div className="flex flex-col items-center justify-center">
            {previewUrl ? (
              <div className="relative">
                <img
                  src={previewUrl}
                  alt="Önizleme"
                  className="w-32 h-32 object-cover rounded-full shadow-md border-4 border-white"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-white text-xs pointer-events-none">
                  Ändra
                </div>
              </div>
            ) : (
              <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 mb-2">
                <Upload size={32} />
              </div>
            )}

            <p className="mt-4 text-sm text-gray-500">
              {previewUrl
                ? "Klicka för att välja en annan bild"
                : "Klicka eller dra för att ladda upp"}
            </p>
          </div>

          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>

        {/* Kaydet Butonu */}
        <div className="pt-4 border-t">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition shadow-md hover:shadow-lg transform active:scale-95"
          >
            <Save size={20} />
            {loading
              ? "Bearbetar..."
              : isEditMode
              ? "Spara Ändringar"
              : "Spara Veterinär"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DoctorForm;

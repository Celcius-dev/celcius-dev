import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "react-toastify";
import { Save, ArrowLeft, Upload } from "lucide-react";

const PatientForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  const UPLOAD_URL = "http://localhost:5000/uploads/";

  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    age: "",
    treatment: "",
    description: "",
    tags: "",
    lastVisit: "",
    nextVisit: "",
    imageFit: "cover",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      const fetchPatient = async () => {
        try {
          const res = await api.get(`/patients/${id}`);
          setFormData({
            ...res.data,
            tags: res.data.tags.join(", "), // Array'i string'e çevir (virgüllü)
          });
          if (res.data.image) setPreviewUrl(UPLOAD_URL + res.data.image);
        } catch (error) {
          toast.error("Veri yüklenemedi");
        }
      };
      fetchPatient();
    }
  }, [isEditMode, id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (selectedFile) data.append("image", selectedFile);

    try {
      if (isEditMode) await api.put(`/patients/${id}`, data);
      else await api.post("/patients", data);

      toast.success(isEditMode ? "Güncellendi" : "Eklendi");
      navigate("/admin/patients");
    } catch (error) {
      toast.error("Hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-10">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="text-gray-500" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">
          {isEditMode ? "Hastayı Düzenle" : "Yeni Hasta Ekle"}
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow space-y-6 border"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-bold text-gray-700 mb-1">Adı</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-bold text-gray-700 mb-1">Irkı</label>
            <input
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-bold text-gray-700 mb-1">Yaşı</label>
            <input
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-gray-700 mb-1">
            Tedavi Başlığı
          </label>
          <input
            name="treatment"
            value={formData.treatment}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Örn: Düzenli Aşı Takibi"
            required
          />
        </div>

        <div>
          <label className="block font-bold text-gray-700 mb-1">Açıklama</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows="2"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-gray-700 mb-1">
              Son Ziyaret
            </label>
            <input
              name="lastVisit"
              value={formData.lastVisit}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="2 hafta önce"
            />
          </div>
          <div>
            <label className="block font-bold text-gray-700 mb-1">
              Gelecek Randevu
            </label>
            <input
              name="nextVisit"
              value={formData.nextVisit}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="12 Mart"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-gray-700 mb-1">
            Etiketler (Virgülle ayırın)
          </label>
          <input
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Aşı, Muayene, Çip"
          />
        </div>

        {/* Resim Yükleme */}
        <div className="bg-gray-50 p-4 rounded border">
          <label className="block font-bold text-gray-700 mb-2 flex items-center gap-2">
            <Upload size={16} /> Fotoğraf
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="block w-full text-sm text-slate-500 mb-4 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />

          {previewUrl && (
            <div className="w-32 h-32 border rounded overflow-hidden">
              <img
                src={previewUrl}
                className="w-full h-full object-cover"
                alt="Preview"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded flex items-center justify-center gap-2"
        >
          <Save size={20} /> {loading ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </form>
    </div>
  );
};

export default PatientForm;

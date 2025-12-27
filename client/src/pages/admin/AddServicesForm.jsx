import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "react-toastify";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Save, ArrowLeft, CheckCircle, Search, Eye } from "lucide-react";
import { iconList, getIconComponent } from "../../utils/iconHelper";

const AddServiceForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: "",
    icon: "Activity", // Varsayılan ikon
    summary: "",
    content: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false); // Detay Önizleme State

  // Editör Ayarları
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };

  useEffect(() => {
    if (isEditMode) {
      const fetchService = async () => {
        try {
          const res = await api.get(`/services/${id}`);
          setFormData({
            title: res.data.title,
            icon: res.data.icon,
            summary: res.data.summary,
            content: res.data.content,
          });
        } catch (error) {
          toast.error("Hizmet bilgileri yüklenemedi.");
        }
      };
      fetchService();
    }
  }, [isEditMode, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditMode) {
        await api.put(`/services/${id}`, formData);
        toast.success("Hizmet güncellendi!");
      } else {
        await api.post("/services", formData);
        toast.success("Hizmet eklendi!");
      }
      navigate("/admin/services");
    } catch (error) {
      toast.error("İşlem başarısız.");
    } finally {
      setLoading(false);
    }
  };

  // İkon Filtreleme
  const filteredIcons = iconList.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Önizleme İkonu
  const PreviewIcon = getIconComponent(formData.icon);

  return (
    <div className="max-w-5xl mx-auto pb-10">
      {/* Üst Bar: Geri Dön, Başlık, Önizleme Butonu */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-500 hover:text-gray-800 transition"
          >
            <ArrowLeft />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            {isEditMode ? "Hizmeti Düzenle" : "Yeni Hizmet Ekle"}
          </h1>
        </div>

        <button
          type="button"
          onClick={() => setShowPreview(true)}
          className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded font-medium transition border border-transparent hover:border-blue-100"
        >
          <Eye size={20} />
          Önizle
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow border border-gray-200 space-y-8"
      >
        {/* Hizmet Başlığı */}
        <div>
          <label className="block text-gray-700 font-bold mb-2">
            Hizmet Başlığı
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Örn: Cerrahi Müdahale"
            required
          />
        </div>

        {/* İkon Seçici */}
        <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
          <div className="flex justify-between items-center mb-4">
            <label className="block text-gray-700 font-bold">İkon Seçimi</label>
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="İkon ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3 py-1 text-sm border rounded-full outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 max-h-64 overflow-y-auto p-1 custom-scrollbar">
            {filteredIcons.map((item) => {
              const Icon = item.component;
              const isSelected = formData.icon === item.name;

              return (
                <div
                  key={item.name}
                  onClick={() => setFormData({ ...formData, icon: item.name })}
                  className={`
                        cursor-pointer p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all relative h-24
                        ${
                          isSelected
                            ? "bg-blue-600 text-white shadow-lg scale-105 border-blue-600"
                            : "bg-white hover:bg-gray-100 text-gray-500 border-gray-200"
                        }
                      `}
                >
                  <Icon size={28} strokeWidth={1.5} />
                  <span className="text-[10px] text-center font-medium truncate w-full px-1">
                    {item.label}
                  </span>
                  {isSelected && (
                    <div className="absolute top-1 right-1 bg-white text-blue-600 rounded-full p-0.5">
                      <CheckCircle
                        size={12}
                        fill="currentColor"
                        className="text-blue-600"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Kısa Özet */}
        <div>
          <label className="block text-gray-700 font-bold mb-2">
            Kısa Açıklama{" "}
            <span className="text-xs font-normal text-gray-500">
              (Anasayfa kartlarında görünür)
            </span>
          </label>
          <textarea
            value={formData.summary}
            onChange={(e) =>
              setFormData({ ...formData, summary: e.target.value })
            }
            maxLength={200}
            rows="3"
            className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Hizmet hakkında kısa bir özet..."
            required
          />
          <div className="text-right text-xs text-gray-400 mt-1">
            {formData.summary.length}/200
          </div>
        </div>

        {/* Detay İçerik */}
        <div>
          <label className="block text-gray-700 font-bold mb-2">
            Detaylı Hizmet İçeriği
          </label>
          <ReactQuill
            theme="snow"
            value={formData.content}
            onChange={(val) => setFormData({ ...formData, content: val })}
            modules={modules}
            className="bg-white h-60 mb-12"
            placeholder="Hizmet detaylarını buraya yazın..."
          />
        </div>

        {/* Kaydet Butonu */}
        <div className="pt-6 border-t">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition shadow-md"
          >
            <Save size={20} />
            {loading
              ? "İşleniyor..."
              : isEditMode
              ? "Değişiklikleri Kaydet"
              : "Hizmeti Yayınla"}
          </button>
        </div>
      </form>

      {/* --- DETAY SAYFASI ÖNİZLEME MODALI --- */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full h-[90vh] flex flex-col relative">
            <div className="flex justify-between items-center p-4 border-b bg-gray-50 rounded-t-xl">
              <h3 className="font-bold text-gray-700 flex items-center gap-2">
                <Eye size={18} /> Detay Sayfası Önizlemesi
              </h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-400 hover:text-red-500 text-3xl leading-none"
              >
                &times;
              </button>
            </div>

            <div className="overflow-y-auto p-8 flex-1 bg-white">
              <div className="max-w-3xl mx-auto text-center mb-10">
                {/* Seçilen İkon (Büyük) */}
                <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-blue-100">
                  <PreviewIcon size={56} strokeWidth={1.5} />
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {formData.title || "Başlık Yok"}
                </h1>
                <p className="text-xl text-gray-500">
                  {formData.summary || "Kısa açıklama buraya gelecek..."}
                </p>
              </div>

              {/* Detay İçerik */}
              <div className="max-w-4xl mx-auto border-t pt-8">
                <div
                  className="prose lg:prose-xl mx-auto ql-editor p-0"
                  dangerouslySetInnerHTML={{ __html: formData.content }}
                />
              </div>
            </div>

            <div className="p-4 border-t bg-gray-50 rounded-b-xl flex justify-end">
              <button
                onClick={() => setShowPreview(false)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 font-bold transition"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddServiceForm;

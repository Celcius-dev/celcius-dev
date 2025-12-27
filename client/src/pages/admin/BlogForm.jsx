import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "react-toastify";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import {
  Eye,
  Save,
  ArrowLeft,
  Image as ImageIcon,
  Maximize,
  Crop,
} from "lucide-react";

const BlogForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    imageFit: "cover", // Varsayılan ayar
    summary: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "blockquote"],
      ["clean"],
    ],
  };

  useEffect(() => {
    if (isEditMode) {
      const fetchBlog = async () => {
        try {
          const res = await api.get(`/blogs/${id}`);
          setFormData({
            title: res.data.title,
            image: res.data.image,
            imageFit: res.data.imageFit || "cover", // Eski kayıtlarda yoksa 'cover' olsun
            summary: res.data.summary,
            content: res.data.content,
          });
        } catch (error) {
          toast.error("Blog verisi yüklenemedi.");
          navigate("/admin/blogs");
        }
      };
      fetchBlog();
    }
  }, [isEditMode, id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditorChange = (value) => {
    setFormData({ ...formData, content: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditMode) {
        await api.put(`/blogs/${id}`, formData);
        toast.success("Blog güncellendi!");
      } else {
        await api.post("/blogs", formData);
        toast.success("Yeni blog yazısı eklendi!");
      }
      navigate("/admin/blogs");
    } catch (error) {
      toast.error(
        "Hata: " + (error.response?.data?.message || "İşlem başarısız")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-10">
      {/* Başlık Alanı */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-500 hover:text-gray-800"
          >
            <ArrowLeft />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            {isEditMode ? "Yazıyı Düzenle" : "Yeni Blog Yazısı"}
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
        className="bg-white p-6 rounded-lg shadow border border-gray-200 space-y-6"
      >
        {/* Başlık Input */}
        <div>
          <label className="block text-gray-700 font-bold mb-2">
            Blog Başlığı
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Blog başlığı..."
            required
          />
        </div>

        {/* --- RESİM VE AYARLARI --- */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <label className="block text-gray-700 font-bold mb-2 flex items-center gap-2">
            <ImageIcon size={18} /> Kapak Resmi
          </label>

          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
          />

          {/* Resim Ayarı Seçenekleri */}
          <div className="mt-4 flex flex-wrap gap-6 text-sm">
            <span className="font-semibold text-gray-600 py-1">
              Görünüm Modu:
            </span>

            <label
              className={`flex items-center gap-2 cursor-pointer px-3 py-1 rounded border transition-all ${
                formData.imageFit === "cover"
                  ? "bg-blue-100 border-blue-400 text-blue-800"
                  : "bg-white border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="imageFit"
                value="cover"
                checked={formData.imageFit === "cover"}
                onChange={handleChange}
                className="hidden" // Radyo butonunu gizleyip custom stil verdik
              />
              <Crop size={16} />
              <span>Doldur (Kırpılabilir)</span>
            </label>

            <label
              className={`flex items-center gap-2 cursor-pointer px-3 py-1 rounded border transition-all ${
                formData.imageFit === "contain"
                  ? "bg-blue-100 border-blue-400 text-blue-800"
                  : "bg-white border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="imageFit"
                value="contain"
                checked={formData.imageFit === "contain"}
                onChange={handleChange}
                className="hidden"
              />
              <Maximize size={16} />
              <span>Sığdır (Tamamı Görünsün)</span>
            </label>
          </div>

          {/* Küçük Önizleme */}
          {formData.image && (
            <div className="mt-4 border rounded bg-white flex justify-center overflow-hidden h-48 relative">
              <img
                src={formData.image}
                alt="Önizleme"
                // Dinamik Class: Seçilen moda göre değişir
                className={`h-full w-full object-${formData.imageFit}`}
              />
              <span className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                Şu anki görünüm:{" "}
                {formData.imageFit === "cover" ? "Doldur" : "Sığdır"}
              </span>
            </div>
          )}
        </div>

        {/* Özet (Summary) */}
        <div>
          <label className="block text-gray-700 font-bold mb-2">
            Kısa Özet{" "}
            <span className="text-xs font-normal text-gray-500">
              (Kartlarda görünür - Max 200 karakter)
            </span>
          </label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            maxLength={200}
            rows="3"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            required
          ></textarea>
          <div className="text-right text-xs text-gray-400 mt-1">
            {formData.summary?.length || 0}/200
          </div>
        </div>

        {/* Rich Text Content */}
        <div>
          <label className="block text-gray-700 font-bold mb-2">
            Detaylı İçerik
          </label>
          <ReactQuill
            theme="snow"
            value={formData.content}
            onChange={handleEditorChange}
            modules={modules}
            className="bg-white h-64 mb-12"
            placeholder="Yazınızı buraya girin..."
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
              ? "Kaydediliyor..."
              : isEditMode
              ? "Değişiklikleri Kaydet"
              : "Yazıyı Yayınla"}
          </button>
        </div>
      </form>

      {/* --- DETAY SAYFASI ÖNİZLEME MODALI --- */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full h-[90vh] flex flex-col relative animate-fadeIn">
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
              <article className="prose lg:prose-xl mx-auto">
                {/* MODALDAKİ RESİM */}
                {formData.image && (
                  <div className="w-full bg-gray-100 rounded-xl mb-8 overflow-hidden border border-gray-200 shadow-sm flex justify-center">
                    <img
                      src={formData.image}
                      alt="Kapak"
                      // BURASI KRİTİK: State'deki 'imageFit' değerini kullanıyor
                      className={`w-full max-h-[500px] object-${formData.imageFit}`}
                    />
                  </div>
                )}

                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {formData.title || "Başlıksız Yazı"}
                </h1>

                <div className="flex items-center gap-4 text-gray-500 text-sm mb-8 border-b pb-4">
                  <span className="font-semibold text-blue-600">
                    Yazar: Admin
                  </span>
                  <span>•</span>
                  <span>{new Date().toLocaleDateString("tr-TR")}</span>
                </div>

                <div
                  className="ql-editor p-0"
                  dangerouslySetInnerHTML={{ __html: formData.content }}
                />
              </article>
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

export default BlogForm;

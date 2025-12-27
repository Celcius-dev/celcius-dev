import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "react-toastify";
import { Eye, Edit, Trash2 } from "lucide-react"; // İkonlar

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State'leri
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewBlog, setPreviewBlog] = useState(null);

  const fetchBlogs = async () => {
    try {
      const res = await api.get("/blogs");
      setBlogs(res.data);
    } catch (error) {
      toast.error("Bloglar yüklenirken hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bu yazıyı silmek istediğine emin misin?")) {
      try {
        await api.delete(`/blogs/${id}`);
        setBlogs(blogs.filter((blog) => blog._id !== id));
        toast.success("Blog yazısı silindi.");
      } catch (error) {
        toast.error("Silme işlemi başarısız.");
      }
    }
  };

  // Önizleme Butonuna Basınca
  const handlePreview = (blog) => {
    setPreviewBlog(blog);
    setIsModalOpen(true);
  };

  if (loading)
    return <div className="p-8 text-center text-gray-500">Yükleniyor...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Blog Yazıları</h1>
        <Link
          to="/admin/blogs/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Yeni Yazı Ekle
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Başlık
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Tarih
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id} className="hover:bg-gray-50">
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-12 h-12 rounded overflow-hidden mr-4 border">
                      <img
                        className="w-full h-full object-cover"
                        src={blog.image || "https://placehold.co/100"}
                        alt={blog.title}
                      />
                    </div>
                    <div>
                      <p className="text-gray-900 font-semibold">
                        {blog.title}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {blog.summary?.substring(0, 40)}...
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <span className="bg-gray-100 text-gray-600 py-1 px-2 rounded text-xs font-medium border border-gray-200">
                    {new Date(blog.createdAt).toLocaleDateString("tr-TR")}
                  </span>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                  <div className="flex items-center justify-end gap-3">
                    {/* ÖNİZLEME BUTONU */}
                    <button
                      onClick={() => handlePreview(blog)}
                      className="text-gray-500 hover:text-blue-600 transition"
                      title="Kart Önizlemesi"
                    >
                      <Eye size={20} />
                    </button>

                    <Link
                      to={`/admin/blogs/edit/${blog._id}`}
                      className="text-blue-500 hover:text-blue-700 transition"
                      title="Düzenle"
                    >
                      <Edit size={20} />
                    </Link>

                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="text-red-500 hover:text-red-700 transition"
                      title="Sil"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {blogs.length === 0 && (
              <tr>
                <td
                  colSpan="3"
                  className="text-center py-8 text-gray-500 italic"
                >
                  Henüz blog yazısı eklenmemiş.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- KART ÖNİZLEME MODALI --- */}
      {isModalOpen && previewBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full relative overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-bold text-gray-700">Kart Önizlemesi</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-800 text-2xl"
              >
                &times;
              </button>
            </div>

            <div className="p-6 bg-gray-100 flex justify-center">
              {/* Sitenizdeki Kart Tasarımı (Simülasyon) */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden w-full">
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={previewBlog.image || "https://placehold.co/600x400"}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                    Blog
                  </span>
                </div>
                <div className="p-4">
                  <span className="text-xs text-gray-500 block mb-2">
                    {new Date(previewBlog.createdAt).toLocaleDateString(
                      "tr-TR"
                    )}
                  </span>
                  <h4 className="font-bold text-lg text-gray-800 mb-2 leading-tight">
                    {previewBlog.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    {previewBlog.summary?.substring(0, 80)}...
                  </p>
                  <button className="text-blue-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                    Devamını Oku <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogList;

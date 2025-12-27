import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "react-toastify";
import { Eye, Edit, Trash2, ArrowRight } from "lucide-react";
import { getIconComponent } from "../../utils/iconHelper";

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State'leri
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewService, setPreviewService] = useState(null);

  const fetchServices = async () => {
    try {
      const res = await api.get("/services");
      setServices(res.data);
    } catch (error) {
      toast.error("Hizmetler yüklenirken hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bu hizmeti silmek istediğine emin misin?")) {
      try {
        await api.delete(`/services/${id}`);
        setServices(services.filter((s) => s._id !== id));
        toast.success("Hizmet silindi.");
      } catch (error) {
        toast.error("Silme başarısız.");
      }
    }
  };

  // Önizleme Butonuna Basınca
  const handlePreview = (service) => {
    setPreviewService(service);
    setIsModalOpen(true);
  };

  if (loading)
    return <div className="p-8 text-center text-gray-500">Yükleniyor...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Hizmet Yönetimi</h1>
        <Link
          to="/admin/services/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Yeni Hizmet Ekle
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Hizmet / İkon
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Kısa Özet
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => {
              const IconComp = getIconComponent(service.icon);
              return (
                <tr key={service._id} className="hover:bg-gray-50 transition">
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-12 h-12 rounded bg-blue-50 text-blue-600 flex items-center justify-center mr-4 border border-blue-100">
                        <IconComp size={24} />
                      </div>
                      <div>
                        <p className="text-gray-900 font-bold">
                          {service.title}
                        </p>
                        <p className="text-gray-400 text-xs">{service.icon}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-600 whitespace-no-wrap max-w-xs truncate">
                      {service.summary}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                    <div className="flex items-center justify-end gap-3">
                      {/* ÖNİZLEME */}
                      <button
                        onClick={() => handlePreview(service)}
                        className="text-gray-500 hover:text-blue-600 transition"
                        title="Kart Önizlemesi"
                      >
                        <Eye size={20} />
                      </button>

                      {/* DÜZENLE */}
                      <Link
                        to={`/admin/services/edit/${service._id}`}
                        className="text-blue-500 hover:text-blue-700 transition"
                        title="Düzenle"
                      >
                        <Edit size={20} />
                      </Link>

                      {/* SİL */}
                      <button
                        onClick={() => handleDelete(service._id)}
                        className="text-red-500 hover:text-red-700 transition"
                        title="Sil"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {services.length === 0 && (
              <tr>
                <td
                  colSpan="3"
                  className="text-center py-8 text-gray-500 italic"
                >
                  Henüz hizmet eklenmemiş.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- KART ÖNİZLEME MODALI --- */}
      {isModalOpen && previewService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full relative overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-bold text-gray-700">Kart Önizlemesi</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-black text-2xl"
              >
                &times;
              </button>
            </div>

            <div className="p-8 bg-gray-100 flex justify-center">
              {/* Sitenizdeki Hizmet Kartı Tasarımı */}
              <div className="bg-white p-6 rounded-xl shadow-md w-full text-center border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
                <div className="w-16 h-16 mx-auto bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                  {(() => {
                    const PreviewIcon = getIconComponent(previewService.icon);
                    return <PreviewIcon size={32} />;
                  })()}
                </div>
                <h4 className="font-bold text-lg text-gray-800 mb-2">
                  {previewService.title}
                </h4>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {previewService.summary}
                </p>
                <div className="text-blue-600 font-bold text-sm flex items-center justify-center gap-1 cursor-pointer">
                  Detaylı Bilgi <ArrowRight size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;

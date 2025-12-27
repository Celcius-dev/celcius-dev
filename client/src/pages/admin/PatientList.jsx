import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "react-toastify";
import { Edit, Trash2 } from "lucide-react";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const UPLOAD_URL = "http://localhost:5000/uploads/";

  const fetchPatients = async () => {
    try {
      const res = await api.get("/patients");
      setPatients(res.data);
    } catch (error) {
      toast.error("Hasta listesi yüklenemedi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bu kaydı silmek istediğinize emin misiniz?")) {
      try {
        await api.delete(`/patients/${id}`);
        setPatients(patients.filter((p) => p._id !== id));
        toast.success("Hasta kaydı silindi.");
      } catch (error) {
        toast.error("Silme başarısız.");
      }
    }
  };

  if (loading)
    return <div className="p-8 text-center text-gray-500">Yükleniyor...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Mutlu Hastalar (Referanslar)
        </h1>
        <Link
          to="/admin/patients/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Yeni Hasta Ekle
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 bg-gray-50 text-left text-xs font-bold text-gray-600 uppercase">
                Hasta
              </th>
              <th className="px-5 py-3 bg-gray-50 text-left text-xs font-bold text-gray-600 uppercase">
                Tedavi / Durum
              </th>
              <th className="px-5 py-3 bg-gray-50 text-right text-xs font-bold text-gray-600 uppercase">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p._id} className="hover:bg-gray-50 transition">
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden mr-4 border border-gray-200">
                      <img
                        className="w-full h-full object-cover"
                        // DÜZELTME BURADA
                        src={
                          p.image
                            ? p.image.startsWith("http")
                              ? p.image
                              : UPLOAD_URL + p.image
                            : "https://placehold.co/100"
                        }
                        alt={p.name}
                      />
                    </div>
                    <div>
                      <p className="text-gray-900 font-bold">{p.name}</p>
                      <p className="text-gray-500 text-xs">
                        {p.breed} • {p.age}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="font-semibold text-gray-700">{p.treatment}</p>
                  <p className="text-gray-500 text-xs">
                    {p.lastVisit} - {p.nextVisit}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                  <div className="flex justify-end gap-3">
                    <Link
                      to={`/admin/patients/edit/${p._id}`}
                      className="text-blue-500 hover:text-blue-700 transition"
                    >
                      <Edit size={20} />
                    </Link>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientList;

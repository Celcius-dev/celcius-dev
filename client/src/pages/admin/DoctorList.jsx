import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api, { UPLOAD_URL } from "../../api/axios";
import { toast } from "react-toastify";
import { Edit, Trash2 } from "lucide-react";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  // URL artık axios.js'den geliyor

  const fetchDoctors = async () => {
    try {
      const res = await api.get("/doctors");
      setDoctors(res.data);
    } catch (error) {
      toast.error("Kunde inte hämta veterinärlistan.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Är du säker på att du vill ta bort denna veterinär?")) {
      try {
        await api.delete(`/doctors/${id}`);
        setDoctors(doctors.filter((d) => d._id !== id));
        toast.success("Veterinären har tagits bort.");
      } catch (error) {
        toast.error("Borttagning misslyckades.");
      }
    }
  };

  if (loading)
    return <div className="p-8 text-center text-gray-500">Laddar...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Veterinärlista</h1>
        <Link
          to="/admin/doctors/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Lägg till ny veterinär
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Namn / Titel
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">
                Åtgärder
              </th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor._id} className="hover:bg-gray-50 transition">
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden mr-4 border border-gray-200">
                      <img
                        className="w-full h-full object-cover"
                        // DÜZELTME BURADA: Http ile başlıyorsa olduğu gibi kullan, yoksa upload url ekle
                        src={
                          doctor.image
                            ? doctor.image.startsWith("http")
                              ? doctor.image
                              : UPLOAD_URL + doctor.image
                            : "https://placehold.co/100"
                        }
                        alt={doctor.name}
                      />
                    </div>
                    <div>
                      <p className="text-gray-900 font-bold">{doctor.name}</p>
                      <p className="text-gray-500 text-xs">{doctor.title}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                  <div className="flex justify-end gap-3">
                    <Link
                      to={`/admin/doctors/edit/${doctor._id}`}
                      className="text-blue-500 hover:text-blue-700 transition"
                    >
                      <Edit size={20} />
                    </Link>
                    <button
                      onClick={() => handleDelete(doctor._id)}
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

export default DoctorList;

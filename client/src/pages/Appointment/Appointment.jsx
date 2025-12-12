import React, { useState, useEffect } from "react";
import "./Appointment.css";
// Mock Verileri import et
import { existingAppointments, workingHours } from "../../data/appointments";

const Appointment = () => {
  // --- STATE ---
  // Varsayılan olarak bugünü seç
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedTime, setSelectedTime] = useState(null);

  // ÖNEMLİ GÜNCELLEME: Dolu randevuları State içinde tutuyoruz ki güncelleyebilelim
  const [bookedAppointments, setBookedAppointments] =
    useState(existingAppointments);

  // Form Verileri
  const [formData, setFormData] = useState({
    ownerName: "",
    petName: "",
    phone: "",
    notes: "",
  });

  // Sayfa açıldığında yukarı kaydır
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- MANTIK: SAATLERİ OLUŞTURMA ---
  const generateTimeSlots = () => {
    const slots = [];
    let start = workingHours.start;
    const end = workingHours.end;

    for (let i = start; i < end; i++) {
      slots.push(`${i.toString().padStart(2, "0")}:00`);
      slots.push(`${i.toString().padStart(2, "0")}:30`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // --- MANTIK: DOLULUK KONTROLÜ (GÜNCELLENDİ) ---
  // Artık statik dosyaya değil, state'e (bookedAppointments) bakıyoruz
  const isSlotBooked = (time) => {
    return bookedAppointments.some(
      (app) => app.date === selectedDate && app.time === time
    );
  };

  // --- HANDLERS ---
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setSelectedTime(null);
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedTime) {
      alert("Lütfen bir randevu saati seçiniz.");
      return;
    }

    // --- GÜNCELLEME: RANDEVUYU LİSTEYE EKLEME ---
    // Backend olmadığı için state'i güncelleyerek dolu gibi gösteriyoruz
    const newAppointment = {
      date: selectedDate,
      time: selectedTime,
    };

    // Mevcut dolu listesine yenisini ekle
    setBookedAppointments([...bookedAppointments, newAppointment]);

    alert(
      `Teşekkürler! ${selectedDate} günü saat ${selectedTime} için randevunuz oluşturuldu.`
    );

    // Formu temizle
    setFormData({ ownerName: "", petName: "", phone: "", notes: "" });
    setSelectedTime(null); // Seçimi kaldır (zaten artık disabled olacak)
  };

  return (
    <div className="appointment-page">
      {/* HEADER */}
      <div className="appointment-header">
        <div className="container">
          <h1 className="appointment-title">Online Randevu</h1>
          <p className="appointment-desc">
            Sıra beklemeden, dilediğiniz saatte randevunuzu hemen oluşturun.
          </p>
        </div>
      </div>

      <div className="container">
        <form className="appointment-layout" onSubmit={handleSubmit}>
          {/* --- SOL KOLON: TARİH VE SAAT SEÇİMİ --- */}
          <div className="appointment-card">
            <h2 className="card-heading">1. Tarih ve Saat Seçimi</h2>

            {/* Tarih Seçici */}
            <div className="date-picker-container">
              <label className="form-label">Tarih Seçiniz</label>
              <input
                type="date"
                className="date-input"
                value={selectedDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={handleDateChange}
                required
              />
            </div>

            {/* Saat Grid'i */}
            <label className="form-label">
              Müsait Saatler (
              {selectedDate
                ? new Date(selectedDate).toLocaleDateString("tr-TR")
                : "Lütfen Tarih Seçin"}
              )
            </label>

            <div className="time-slots-grid">
              {timeSlots.map((time, index) => {
                const booked = isSlotBooked(time);
                return (
                  <button
                    key={index}
                    type="button"
                    className={`time-slot-btn ${
                      selectedTime === time ? "selected" : ""
                    }`}
                    onClick={() => handleTimeClick(time)}
                    disabled={booked} // Doluysa tıklanamaz (State güncellendiği için burası anında disabled olacak)
                  >
                    {time}
                  </button>
                );
              })}
            </div>

            <div
              style={{ marginTop: "1rem", fontSize: "0.85rem", color: "#666" }}
            >
              * Üzeri çizili saatler doludur.
            </div>
          </div>

          {/* --- SAĞ KOLON: KİŞİSEL BİLGİLER --- */}
          <div className="appointment-card">
            <h2 className="card-heading">2. Kişisel Bilgiler</h2>

            <div className="form-group">
              <label className="form-label">Hasta Sahibi Adı Soyadı</label>
              <input
                type="text"
                name="ownerName"
                className="form-input"
                placeholder="Örn: Ahmet Yılmaz"
                value={formData.ownerName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Evcil Dostumuzun Adı</label>
              <input
                type="text"
                name="petName"
                className="form-input"
                placeholder="Örn: Pamuk"
                value={formData.petName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Telefon Numarası</label>
              <input
                type="tel"
                name="phone"
                className="form-input"
                placeholder="0555 555 55 55"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Notunuz / Şikayetiniz</label>
              <textarea
                name="notes"
                className="form-textarea"
                placeholder="Kısaca belirtiniz (Aşı, Muayene, Halsizlik vb.)"
                value={formData.notes}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={!selectedTime}
            >
              Randevuyu Onayla
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Appointment;

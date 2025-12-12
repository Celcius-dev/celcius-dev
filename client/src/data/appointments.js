// Yardımcı fonksiyon: Bugünün tarihine 'daysToAdd' kadar gün ekler
const getFutureDate = (daysToAdd) => {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);
  return date.toISOString().split("T")[0]; // "YYYY-MM-DD" formatında döndürür
};

// DOLU OLAN RANDEVULAR LİSTESİ
export const existingAppointments = [
  // BUGÜN İÇİN DOLU SAATLER
  { date: getFutureDate(0), time: "09:30" },
  { date: getFutureDate(0), time: "11:00" },
  { date: getFutureDate(0), time: "14:30" },
  { date: getFutureDate(0), time: "16:00" },

  // YARIN İÇİN DOLU SAATLER
  { date: getFutureDate(1), time: "10:00" },
  { date: getFutureDate(1), time: "10:30" },
  { date: getFutureDate(1), time: "13:00" }, // Öğle arası yoğunluğu
  { date: getFutureDate(1), time: "13:30" },
  { date: getFutureDate(1), time: "17:30" },

  // SONRAKİ GÜN İÇİN DOLU SAATLER
  { date: getFutureDate(2), time: "09:00" },
  { date: getFutureDate(2), time: "11:30" },
  { date: getFutureDate(2), time: "15:00" },
];

// MESAİ SAATLERİ AYARLARI
export const workingHours = {
  start: 9, // 09:00
  end: 18, // 18:00
  interval: 30, // Dakika
};

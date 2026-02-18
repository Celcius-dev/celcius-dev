// İhtiyacın olabilecek tüm ikonları buraya ekle
import {
  Building, // Hastane/Klinik
  ClipboardList, // Raporlar
  Scan, // Görüntüleme
  Monitor, // Yoğun Bakım
  Bed, // Yatış
  Siren, // Acil
  ShieldCheck, // Aşı/Koruma
  Microscope, // Lab
  FileHeart, // Sağlık Kayıtları
  UserRound, // Uzmanlar
  BriefcaseMedical, // Medikal Çanta
  Baby, // Pediyatri/Yenidoğan
  Stethoscope,
  Syringe,
  Dog,
  Cat,
  Scissors,
  Activity,
  Ambulance,
  Bone,
  Pill,
  HeartPulse,
  Brain,
  Thermometer,
  Eye,
  Zap,
} from "lucide-react";

// 1. Admin Panelinde Seçilecek Liste
export const iconList = [
  { name: "Building", component: Building, label: "Sjukhus/Klinik" },
  { name: "ClipboardList", component: ClipboardList, label: "Rapporter/Kontroller" },
  { name: "Scan", component: Scan, label: "Röntgen/MR" },
  { name: "Monitor", component: Monitor, label: "Intensivvård" },
  { name: "Bed", component: Bed, label: "Inläggning" },
  { name: "Siren", component: Siren, label: "Akut 24/7" },
  { name: "ShieldCheck", component: ShieldCheck, label: "Vaccination" },
  { name: "Microscope", component: Microscope, label: "Laboratorium" },
  { name: "FileHeart", component: FileHeart, label: "Journaler" },
  { name: "UserRound", component: UserRound, label: "Specialister" },
  { name: "BriefcaseMedical", component: BriefcaseMedical, label: "Medicinska Tjänster" },
  { name: "Baby", component: Baby, label: "Nyfödd/Pediatrik" },
  { name: "Stethoscope", component: Stethoscope, label: "Undersökning" },
  { name: "Syringe", component: Syringe, label: "Vaccin" },
  { name: "Dog", component: Dog, label: "Hundvård" },
  { name: "Cat", component: Cat, label: "Kattvård" },
  { name: "Scissors", component: Scissors, label: "Trimning & Vård" },
  { name: "Bone", component: Bone, label: "Ortopedi" },
  { name: "Ambulance", component: Ambulance, label: "Ambulans" },
  { name: "Pill", component: Pill, label: "Apotek" },
  { name: "HeartPulse", component: HeartPulse, label: "Kardiologi" },
  { name: "Brain", component: Brain, label: "Neurologi" },
  { name: "Thermometer", component: Thermometer, label: "Febermätning" },
  { name: "Eye", component: Eye, label: "Ögonbehandling" },
  { name: "Zap", component: Zap, label: "Laserbehandling" },
  { name: "Activity", component: Activity, label: "Allmänt" },
];

// 2. String isminden Component getiren fonksiyon
// Kullanımı: const Icon = getIconComponent("Stethoscope"); return <Icon />
export const getIconComponent = (iconName) => {
  const found = iconList.find((i) => i.name === iconName);
  return found ? found.component : Activity;
};

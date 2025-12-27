// İhtiyacın olabilecek tüm ikonları buraya ekle
import {
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
  Microscope,
  Thermometer,
  Eye,
  Zap,
} from "lucide-react";

// 1. Admin Panelinde Seçilecek Liste
export const iconList = [
  { name: "Stethoscope", component: Stethoscope, label: "Muayene" },
  { name: "Syringe", component: Syringe, label: "Aşı" },
  { name: "Dog", component: Dog, label: "Köpek Bakımı" },
  { name: "Cat", component: Cat, label: "Kedi Bakımı" },
  { name: "Scissors", component: Scissors, label: "Tıraş & Bakım" },
  { name: "Bone", component: Bone, label: "Ortopedi / Kırık" },
  { name: "Ambulance", component: Ambulance, label: "Acil Servis" },
  { name: "Pill", component: Pill, label: "Eczane" },
  { name: "HeartPulse", component: HeartPulse, label: "Kardiyoloji" },
  { name: "Brain", component: Brain, label: "Nöroloji" },
  { name: "Microscope", component: Microscope, label: "Laboratuvar" },
  { name: "Thermometer", component: Thermometer, label: "Ateş Ölçümü" },
  { name: "Eye", component: Eye, label: "Göz Tedavisi" },
  { name: "Zap", component: Zap, label: "Lazer Tedavi" },
  { name: "Activity", component: Activity, label: "Genel / Diğer" },
];

// 2. String isminden Component getiren fonksiyon
// Kullanımı: const Icon = getIconComponent("Stethoscope"); return <Icon />
export const getIconComponent = (iconName) => {
  const found = iconList.find((i) => i.name === iconName);
  return found ? found.component : Activity;
};

import mongoose from "mongoose";
import dotenv from "dotenv";
import Service from "./models/Service.js";
import Blog from "./models/Blog.js";
import Doctor from "./models/Doctor.js";
import Patient from "./models/Patients.js";
import connectDB from "./config/db.js";

// Çevre değişkenlerini yükle
dotenv.config();

// --- DATA SETLERİ ---

const services = [
  {
    title: "Genel Muayene",
    icon: "Stethoscope", // Backend'de string tutulur
    summary:
      "Evcil dostunuzun genel sağlık durumunun kontrolü, erken teşhis ve koruyucu hekimlik uygulamaları.",
    content: `
      <p>Evcil dostlarınızın sağlıklı ve uzun bir ömür sürmesi için düzenli genel muayeneler hayati önem taşır. Kliniğimizde genel muayene kapsamında, burun ucundan kuyruk ucuna kadar detaylı bir fiziksel kontrol gerçekleştiriyoruz.</p>
      <h3>Muayene Kapsamımız:</h3>
      <ul>
        <li>Göz, kulak ve ağız içi kontrolleri</li>
        <li>Kalp ve akciğer dinlemesi (Oskültasyon)</li>
        <li>Lenf yumrularının kontrolü</li>
        <li>Deri ve tüy sağlığı analizi</li>
        <li>Kilo ve vücut kondisyon skoru takibi</li>
      </ul>
      <p>Erken teşhis, birçok hastalığın tedavisinde başarı oranını %90 artırmaktadır. Bu nedenle yılda en az iki kez genel kontrol önermekteyiz.</p>
    `,
  },
  {
    title: "Aşı Takvimi",
    icon: "Syringe",
    summary:
      "Yavru ve yetişkin kedi/köpekler için parazit uygulamaları ve yıllık karma aşı takibi.",
    content: `
      <p>Aşılar, evcil hayvanlarınızı ölümcül viral hastalıklara karşı korumanın en etkili yoludur. Kliniğimizde, Dünya Veteriner Hekimleri Birliği (WSAVA) standartlarına uygun aşı protokolleri uygulanmaktadır.</p>
      <h3>Uyguladığımız Aşılar:</h3>
      <p>Kedi ve köpekler için Kuduz, Karma, Bronşin (Kennel Cough), Lösemi ve diğer temel aşılar, hastanızın yaşam tarzına ve yaşına göre planlanır.</p>
      <p>Ayrıca iç ve dış parazit uygulamaları ile hem dostunuzu hem de sizi zoonoz hastalıklardan koruyoruz. Aşı zamanı geldiğinde SMS ile hatırlatma sistemimiz devreye girmektedir.</p>
    `,
  },
  {
    title: "Cerrahi Operasyonlar",
    icon: "Scissors",
    summary:
      "Kısırlaştırma, yumuşak doku cerrahisi ve ortopedik operasyonlar steril ameliyathanemizde yapılır.",
    content: `
      <p>Cerrahi müdahaleler, sterilizasyonun en üst düzeyde tutulduğu ameliyathanemizde, gaz anestezi cihazları ve vital monitörler eşliğinde yapılmaktadır.</p>
      <h3>Cerrahi Hizmetlerimiz:</h3>
      <ul>
        <li>Kısırlaştırma (Ovariohisterektomi / Kastrasyon)</li>
        <li>Yumuşak doku cerrahisi (Tümör, yara onarımı vb.)</li>
        <li>Ortopedik operasyonlar (Kırık, çıkık tedavileri)</li>
      </ul>
      <p>Operasyon öncesi hemogram ve biyokimya testleri ile anestezi riskini minimuma indiriyor, operasyon sonrası yoğun bakım ünitemizde uyanma sürecini takip ediyoruz.</p>
    `,
  },
  {
    title: "Ağız ve Diş Sağlığı",
    icon: "Smile", // İkon helper'da yoksa varsayılan gelir
    summary:
      "Diş taşı temizliği (detertraj), diş çekimi ve diş eti hastalıklarının tedavisi.",
    content: `
      <p>Ağız kokusu sadece kozmetik bir sorun değil, ciddi sağlık problemlerinin habercisi olabilir. Diş eti hastalıkları, bakterilerin kana karışarak kalp ve böbrek gibi organlara zarar vermesine neden olabilir.</p>
      <p>Ultrasonik kavitron cihazımız ile diş minelerine zarar vermeden diş taşı temizliği (detertraj) ve polisaj işlemi uyguluyoruz. Ayrıca çekilmesi gereken dişler için cerrahi müdahale imkanımız bulunmaktadır.</p>
    `,
  },
  {
    title: "Laboratuvar",
    icon: "TestTube",
    summary:
      "Hemogram, biyokimya ve idrar analizleri ile hastalıkların hızlı ve doğru tanısı.",
    content: `
      <p>Doğru teşhis, doğru tedavinin anahtarıdır. Kliniğimiz bünyesindeki laboratuvarımızda sonuçları dakikalar içinde alarak vakit kaybetmeden tedaviye başlıyoruz.</p>
      <h3>Laboratuvar İmkanları:</h3>
      <ul>
        <li>Hemogram (Tam Kan Sayımı)</li>
        <li>Biyokimya (Karaciğer, Böbrek vb. organ fonksiyonları)</li>
        <li>Mikroskobik İncelemeler (Deri kazıntısı, kulak akıntısı)</li>
        <li>Hızlı Test Kitleri (Viral hastalıklar için)</li>
        <li>İdrar Analizi</li>
      </ul>
    `,
  },
  {
    title: "Mikroçip & Pasaport",
    icon: "QrCode",
    summary:
      "Yasal zorunluluk olan mikroçip uygulaması ve uluslararası pet pasaportu düzenlenmesi.",
    content: `
      <p>5199 sayılı Hayvanları Koruma Kanunu gereğince evcil hayvanların mikroçip ile kayıt altına alınması yasal bir zorunluluktur.</p>
      <p>Kliniğimizde steril enjektörler içerisinde gelen pirinç tanesi büyüklüğündeki mikroçipler, saniyeler içinde deri altına uygulanır. Bu işlem ağrısızdır ve anestezi gerektirmez. Uygulama sonrası Tarım ve Orman Bakanlığı sistemine (PETVET) kaydınız yapılır ve Uluslararası Pet Pasaportunuz düzenlenir.</p>
    `,
  },
];

const blogs = [
  {
    title: "Kedilerde Aşı Takvimi ve Önemi",
    summary:
      "Kedinizin sağlığı için ilk yılda olması gereken temel aşılar ve dikkat edilmesi gerekenler.",
    content: `
      <p>Kedilerde aşı takvimi, özellikle ilk yılda oldukça kritiktir. Yavru kediler anne sütünden kesildikten sonra bağışıklık sistemleri zayıflar ve hastalıklara açık hale gelirler.</p>
      <h3>Temel Aşı Takvimi:</h3>
      <ul>
        <li>6-8 haftalıkken: Karma aşı (1. doz)</li>
        <li>9-11 haftalıkken: Karma aşı (2. doz) ve Lösemi (1. doz)</li>
        <li>12-14 haftalıkken: Kuduz aşısı ve Lösemi (2. doz)</li>
      </ul>
      <p>Aşılar sadece kedinizi korumakla kalmaz, bazı zoonoz hastalıkların size bulaşmasını da engeller. Detaylı bilgi için mutlaka veteriner hekiminize danışın.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    createdAt: new Date("2025-11-25"),
  },
  {
    title: "Köpeklerde Kısırlaştırma Neden Önemli?",
    summary:
      "Davranışsal ve sağlık açısından kısırlaştırmanın faydaları nelerdir?",
    content: `
      <p>Kısırlaştırma operasyonu, köpeğinizin hem davranışsal hem de sağlık açısından daha dengeli olmasına yardımcı olabilir.</p>
      <h3>Sağlık Açısından Faydaları:</h3>
      <p>Dişi köpeklerde rahim enfeksiyonları (pyometra) ve meme tümörü riskini ciddi oranda azaltır. Erkek köpeklerde ise testis kanseri riskini ortadan kaldırır ve prostat sorunlarını en aza indirir.</p>
      <h3>Davranışsal Faydaları:</h3>
      <p>Kısırlaştırılmış köpekler genellikle daha uysaldır, evden kaçma eğilimleri azalır ve agresyon problemleri daha az görülür.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    createdAt: new Date("2025-11-26"),
  },
  {
    title: "Muhabbet Kuşlarında Ani Tüy Dökümü",
    summary:
      "Tüy dökümünün normal mi yoksa hastalık belirtisi mi olduğunu nasıl anlarsınız?",
    content: `
      <p>Ani tüy dökümü bazen stres, bazen de ciddi bir hastalığın belirtisi olabilir. Mevsimsel tüy dökümü normaldir ancak kel bölgeler oluşuyorsa dikkat!</p>
      <h3>Dikkat Edilmesi Gerekenler:</h3>
      <ol>
        <li><strong>Ortam Sıcaklığı:</strong> Ani ısı değişimleri tüy dökümünü tetikler.</li>
        <li><strong>Beslenme:</strong> B vitamini eksikliği tüylerin kalitesini bozar.</li>
        <li><strong>Parazitler:</strong> Dış parazitler kaşıntı ve dökülmeye yol açar.</li>
      </ol>
      <p>Kuşunuzda halsizlik ve iştahsızlık da varsa mutlaka kliniğimize başvurun.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1552728089-57bdde30ebd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    createdAt: new Date("2025-11-27"),
  },
  {
    title: "Evcil Hayvanlarda Ağız ve Diş Sağlığı",
    summary:
      "Kötü ağız kokusu sadece kozmetik bir sorun değildir, ciddi hastalıkların habercisi olabilir.",
    content: `
      <p>Çoğu evcil hayvan sahibi, kedi ve köpeklerinin dişlerini fırçalaması gerektiğini bilmez. Oysa diş taşı oluşumu, diş eti çekilmelerine ve diş kayıplarına yol açar.</p>
      <p>Daha da önemlisi, diş etindeki bakteriler kana karışarak kalp, böbrek ve karaciğer yetmezliğine neden olabilir. Düzenli diş kontrolü ve detertraj (diş taşı temizliği) hayati önem taşır.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1599443015574-be5fe8a05783?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    createdAt: new Date("2025-11-28"),
  },
  {
    title: "Yavru Köpek Eğitimi: İlk Adımlar",
    summary:
      "Eve yeni gelen yavru köpeğinizle iletişim kurmanın ve tuvalet eğitiminin püf noktaları.",
    content: `
      <p>Yavru köpek eğitimi sabır ve tutarlılık gerektirir. İlk kural: Asla ceza kullanmayın, pozitif pekiştirme (ödül) yöntemini seçin.</p>
      <p>Tuvalet eğitimi için onu uykudan uyanınca, yemekten sonra ve oyun bitiminde mutlaka dışarı (veya pede) götürün. Doğru yere yaptığında coşkuyla ödüllendirin.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    createdAt: new Date("2025-11-29"),
  },
  {
    title: "Yaşlı Evcil Dostlarımızın Bakımı",
    summary:
      "Senior (yaşlı) kedi ve köpeklerin değişen ihtiyaçları ve konforlu bir yaşlılık için öneriler.",
    content: `
      <p>Kedi ve köpekler 7 yaşından sonra genellikle "yaşlı" kategorisine girer. Bu dönemde metabolizmaları yavaşlar ve hareketleri azalabilir.</p>
      <h3>Dikkat Edilmesi Gerekenler:</h3>
      <ul>
        <li>Eklem ağrıları için ortopedik yataklar kullanın.</li>
        <li>Senior mamalara geçerek kilo kontrolünü sağlayın.</li>
        <li>Yılda en az iki kez check-up yaptırarak böbrek değerlerini kontrol ettirin.</li>
      </ul>
    `,
    image:
      "https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    createdAt: new Date("2025-11-30"),
  },
];

const doctors = [
  {
    name: "Dr. Ahmet Yılmaz",
    title: "Başhekim & Cerrahi Uzmanı",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400&h=400",
  },
  {
    name: "Dr. Elif Kaya",
    title: "Dahiliye Uzmanı",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400&h=400",
  },
  {
    name: "Dr. Burak Demir",
    title: "Ortopedi Uzmanı",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400&h=400",
  },
  {
    name: "Dr. Zeynep Çelik",
    title: "Dermatoloji Uzmanı",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400&h=400",
  },
  {
    name: "Vet. Tek. Caner Öz",
    title: "Baş Teknisyen",
    image:
      "https://images.unsplash.com/photo-1612531386530-97286d74c2ea?auto=format&fit=crop&q=80&w=400&h=400",
  },
  {
    name: "Dr. Ayşe Yıldız",
    title: "Kedi Hastalıkları Uzmanı",
    image:
      "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=400&h=400",
  },
  {
    name: "Dr. Mehmet Kara",
    title: "Egzotik Hayvanlar",
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400&h=400",
  },
  {
    name: "Selin Vural",
    title: "Laboratuvar Sorumlusu",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400",
  },
];

const patients = [
  {
    name: "Mia",
    breed: "Scottish Fold",
    age: "2 yaşında",
    treatment: "Düzenli Aşı Takibi",
    description: "Dijital aşı kartı ve randevu hatırlatıcı ile takip ediliyor.",
    image:
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&q=80&w=200&h=200",
    tags: ["Aşı Takvimi", "Kan Tahlili", "Dijital Kayıt"],
    lastVisit: "2 hafta önce",
    nextVisit: "12 Mart",
  },
  {
    name: "Barney",
    breed: "Golden Retriever",
    age: "4 yaşında",
    treatment: "Kalça Displazisi Tedavisi",
    description:
      "Fizik tedavi seansları ve düzenli ortopedik kontroller yapılıyor.",
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=200&h=200",
    tags: ["Ortopedi", "Fizik Tedavi", "Röntgen"],
    lastVisit: "3 gün önce",
    nextVisit: "15 Nisan",
  },
  {
    name: "Pamuk",
    breed: "Ankara Kedisi",
    age: "6 yaşında",
    treatment: "Diş Taşı Temizliği",
    description: "Detertraj işlemi yapıldı, diş eti sağlığı koruma altında.",
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=200&h=200",
    tags: ["Diş Bakımı", "Genel Muayene", "Beslenme"],
    lastVisit: "1 ay önce",
    nextVisit: "20 Mayıs",
  },
  {
    name: "Rocky",
    breed: "French Bulldog",
    age: "1 yaşında",
    treatment: "Alerji Yönetimi",
    description:
      "Deri döküntüleri için özel diyet ve medikal şampuan tedavisi.",
    image:
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=200&h=200",
    tags: ["Dermatoloji", "Alerji Testi", "Özel Diyet"],
    lastVisit: "1 hafta önce",
    nextVisit: "1 Nisan",
  },
];

// --- SEEDER FONKSİYONU ---

const importData = async () => {
  try {
    // 1. Veritabanına Bağlan
    await connectDB();
    console.log("Veritabanına bağlanıldı...");

    // 2. Mevcut Verileri Temizle
    await Service.deleteMany();
    await Blog.deleteMany();
    await Doctor.deleteMany();
    await Patient.deleteMany();
    console.log("Eski veriler temizlendi.");

    // 3. Yeni Verileri Ekle
    await Service.insertMany(services);
    await Blog.insertMany(blogs);
    await Doctor.insertMany(doctors);
    await Patient.insertMany(patients);

    console.log("✅ Tüm veriler başarıyla eklendi!");
    process.exit();
  } catch (error) {
    console.error("❌ Hata:", error);
    process.exit(1);
  }
};

importData();

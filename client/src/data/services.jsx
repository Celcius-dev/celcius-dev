// src/data/services.jsx

export const services = [
  {
    id: 1,
    title: "Genel Muayene",
    description:
      "Evcil dostunuzun genel sağlık durumunun kontrolü, erken teşhis ve koruyucu hekimlik uygulamaları.",
    // YENİ EKLENENLER:
    image:
      "https://images.unsplash.com/photo-1628009368231-76033527212e?auto=format&fit=crop&q=80&w=800&h=500",
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
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Aşı Takvimi",
    description:
      "Yavru ve yetişkin kedi/köpekler için parazit uygulamaları ve yıllık karma aşı takibi.",
    image:
      "https://images.unsplash.com/photo-1599443015574-be5fe8a05783?auto=format&fit=crop&q=80&w=800&h=500",
    content: `
      <p>Aşılar, evcil hayvanlarınızı ölümcül viral hastalıklara karşı korumanın en etkili yoludur. Kliniğimizde, Dünya Veteriner Hekimleri Birliği (WSAVA) standartlarına uygun aşı protokolleri uygulanmaktadır.</p>
      <h3>Uyguladığımız Aşılar:</h3>
      <p>Kedi ve köpekler için Kuduz, Karma, Bronşin (Kennel Cough), Lösemi ve diğer temel aşılar, hastanızın yaşam tarzına ve yaşına göre planlanır.</p>
      <p>Ayrıca iç ve dış parazit uygulamaları ile hem dostunuzu hem de sizi zoonoz hastalıklardan koruyoruz. Aşı zamanı geldiğinde SMS ile hatırlatma sistemimiz devreye girmektedir.</p>
    `,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m12 14 4-4" />
        <path d="M3.34 19a10 10 0 1 1 17.32 0" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Cerrahi Operasyonlar",
    description:
      "Kısırlaştırma, yumuşak doku cerrahisi ve ortopedik operasyonlar steril ameliyathanemizde yapılır.",
    image:
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&q=80&w=800&h=500",
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
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="18" x2="12" y2="12" />
        <line x1="9" y1="15" x2="15" y2="15" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Ağız ve Diş Sağlığı",
    description:
      "Diş taşı temizliği (detertraj), diş çekimi ve diş eti hastalıklarının tedavisi.",
    image:
      "https://images.unsplash.com/photo-1596272875729-ed2ff7d6d9c5?auto=format&fit=crop&q=80&w=800&h=500",
    content: `
      <p>Ağız kokusu sadece kozmetik bir sorun değil, ciddi sağlık problemlerinin habercisi olabilir. Diş eti hastalıkları, bakterilerin kana karışarak kalp ve böbrek gibi organlara zarar vermesine neden olabilir.</p>
      <p>Ultrasonik kavitron cihazımız ile diş minelerine zarar vermeden diş taşı temizliği (detertraj) ve polisaj işlemi uyguluyoruz. Ayrıca çekilmesi gereken dişler için cerrahi müdahale imkanımız bulunmaktadır.</p>
    `,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 5.5c2.5-3 5.5-3 8-1.5 2.5 1.5 2.5 4.5 1.5 7-2 4.5-9.5 12-9.5 12S4.5 15.5 2.5 11C1.5 8.5 1.5 5.5 4 4c2.5-1.5 5.5-1.5 8 1.5z" />
      </svg>
    ),
  },
  {
    id: 5,
    title: "Laboratuvar",
    description:
      "Hemogram, biyokimya ve idrar analizleri ile hastalıkların hızlı ve doğru tanısı.",
    image:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800&h=500",
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
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 2v7.31" />
        <path d="M14 2v7.31" />
        <path d="M8.5 2h7" />
        <path d="M14 9.3a6.5 6.5 0 1 1-4 0" />
        <path d="M5.52 16h12.96" />
      </svg>
    ),
  },
  {
    id: 6,
    title: "Mikroçip & Pasaport",
    description:
      "Yasal zorunluluk olan mikroçip uygulaması ve uluslararası pet pasaportu düzenlenmesi.",
    image:
      "https://images.unsplash.com/photo-1623366302587-b38b1ddaefd9?auto=format&fit=crop&q=80&w=800&h=500",
    content: `
      <p>5199 sayılı Hayvanları Koruma Kanunu gereğince evcil hayvanların mikroçip ile kayıt altına alınması yasal bir zorunluluktur.</p>
      <p>Kliniğimizde steril enjektörler içerisinde gelen pirinç tanesi büyüklüğündeki mikroçipler, saniyeler içinde deri altına uygulanır. Bu işlem ağrısızdır ve anestezi gerektirmez. Uygulama sonrası Tarım ve Orman Bakanlığı sistemine (PETVET) kaydınız yapılır ve Uluslararası Pet Pasaportunuz düzenlenir.</p>
    `,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
];

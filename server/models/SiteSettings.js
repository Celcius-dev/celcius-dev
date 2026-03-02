import mongoose from "mongoose";

const SiteSettingsSchema = new mongoose.Schema(
  {
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
    address: { type: String, default: "" },

    // Sosyal Medya
    social: {
      facebook: { type: String, default: "" },
      instagram: { type: String, default: "" },
      twitter: { type: String, default: "" },
    },

    // Çalışma Saatleri
    hours: {
      weekdayStart: { type: String, default: "09:00" },
      weekdayEnd: { type: String, default: "18:00" },
      weekendStart: { type: String, default: "10:00" },
      weekendEnd: { type: String, default: "15:00" },
    },

    // Site İçerik Metinleri (Site Editörü)
    content: {
      hero: {
        title: { type: String, default: "En modern och kärleksfull plats för dina små vänner" },
        subtitle: { type: String, default: "Den större kliniken med det varma hjärtat i den lilla" },
        buttonText: { type: String, default: "Om oss" },
      },
      intro: {
        badge: { type: String, default: "Öppet vardagar 08.00 - 17.00" },
        badgeText: { type: String, default: "Vi erbjuder online bokning, digital patienthistorik och ett modernt diagnossystem" },
        title: { type: String, default: "Veterinärvård" },
        titleHighlight: { type: String, default: "för djurens bästa" },
        text: { type: String, default: "Celcius samlar undersökning, vaccination, kirurgi och laboratorietjänster på ett ställe med ett digitalt journalsystem. Medan du fokuserar på din vän, tar vi hand om hela processen." },
        buttonText: { type: String, default: "Utforska Våra Tjänster" },
      },
      services: {
        title: { type: String, default: "Våra Tjänster" },
        subtitle: { type: String, default: "Vi erbjuder ett brett utbud av tjänster inom poliklinik, operation, ortopedi, tand, lab och medicin." },
      },
      about: {
        bannerTitle: { type: String, default: "Vår filosofi är trygg, modern och kärleksfull vård" },
        bannerDesc: { type: String, default: "På Celsius Veterinärklinik tar vi hand om hundar och katter med samma värme och engagemang som om de vore våra egna." },
        missionTitle: { type: String, default: "Vi arbetar för att ge ditt djur ett friskare och lyckligare liv" },
        missionText: { type: String, default: "Vi arbetar för att förbättra livskvaliteten för alla sällskapsdjur genom förebyggande vård, avancerad diagnostik, tydliga behandlingsplaner och ett öppet och tryggt bemötande." },
        visionTitle: { type: String, default: "Vi vill vara en plats du och din familj känner er trygga i" },
        visionText: { type: String, default: "Vi strävar efter att vara en veterinärklinik som djurägare tryggt rekommenderar vidare. Med modern teknisk utrustning, ett omtänksamt bemötande och ett kunnigt veterinärteam vill vi sätta en ny standard inom veterinärvård." },
        teamTitle: { type: String, default: "Vårt team består av erfarna veterinärer med hjärtat på rätt plats" },
        teamSubtitle: { type: String, default: "Våra veterinärer och sköterskor arbetar tillsammans för att ge ditt djur bästa möjliga vård – från första undersökningen till sista återbesöket." },
      },
      blog: {
        title: { type: String, default: "Senaste blogginlägg och nyheter" },
        subtitle: { type: String, default: "Tips från experter rörande djurhälsa, skötsel och näring." },
        viewAllText: { type: String, default: "Visa alla blogginlägg och nyheter" },
      },
      contact: {
        title: { type: String, default: "Kontakta oss" },
        subtitle: { type: String, default: "Vi finns här för att hjälpa dig och ditt husdjur." },
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("SiteSettings", SiteSettingsSchema);

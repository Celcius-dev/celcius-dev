import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

// ─── Varsayılan metinler (backend'de değer yoksa bunlar kullanılır) ───────────
const DEFAULT_CONTENT = {
  hero: {
    title: "En modern och kärleksfull plats för dina små vänner",
    subtitle: "Den större kliniken med det varma hjärtat i den lilla",
    buttonText: "Om oss",
  },
  intro: {
    badge: "Öppet vardagar 08.00 - 17.00",
    badgeText:
      "Vi erbjuder online bokning, digital patienthistorik och ett modernt diagnossystem",
    title: "Veterinärvård",
    titleHighlight: "för djurens bästa",
    text: "Celcius samlar undersökning, vaccination, kirurgi och laboratorietjänster på ett ställe med ett digitalt journalsystem. Medan du fokuserar på din vän, tar vi hand om hela processen.",
    buttonText: "Utforska Våra Tjänster",
  },
  services: {
    title: "Våra Tjänster",
    subtitle:
      "Vi erbjuder ett brett utbud av tjänster inom poliklinik, operation, ortopedi, tand, lab och medicin.",
  },
  about: {
    bannerTitle: "Vår filosofi är trygg, modern och kärleksfull vård",
    bannerDesc:
      "På Celsius Veterinärklinik tar vi hand om hundar och katter med samma värme och engagemang som om de vore våra egna.",
    missionTitle:
      "Vi arbetar för att ge ditt djur ett friskare och lyckligare liv",
    missionText:
      "Vi arbetar för att förbättra livskvaliteten för alla sällskapsdjur genom förebyggande vård, avancerad diagnostik, tydliga behandlingsplaner och ett öppet och tryggt bemötande.",
    visionTitle:
      "Vi vill vara en plats du och din familj känner er trygga i",
    visionText:
      "Vi strävar efter att vara en veterinärklinik som djurägare tryggt rekommenderar vidare. Med modern teknisk utrustning, ett omtänksamt bemötande och ett kunnigt veterinärteam vill vi sätta en ny standard inom veterinärvård.",
    teamTitle:
      "Vårt team består av erfarna veterinärer med hjärtat på rätt plats",
    teamSubtitle:
      "Våra veterinärer och sköterskor arbetar tillsammans för att ge ditt djur bästa möjliga vård – från första undersökningen till sista återbesöket.",
  },
  blog: {
    title: "Senaste blogginlägg och nyheter",
    subtitle: "Tips från experter rörande djurhälsa, skötsel och näring.",
    viewAllText: "Visa alla blogginlägg och nyheter",
  },
  contact: {
    title: "Kontakta oss",
    subtitle: "Vi finns här för att hjälpa dig och ditt husdjur.",
  },
};

// ─── Deep merge helper ────────────────────────────────────────────────────────
function deepMerge(defaults, overrides = {}) {
  const result = { ...defaults };
  for (const key of Object.keys(defaults)) {
    if (
      overrides[key] !== undefined &&
      overrides[key] !== null &&
      overrides[key] !== ""
    ) {
      if (
        typeof defaults[key] === "object" &&
        !Array.isArray(defaults[key])
      ) {
        result[key] = deepMerge(defaults[key], overrides[key]);
      } else {
        result[key] = overrides[key];
      }
    }
  }
  return result;
}

// ─── Context ──────────────────────────────────────────────────────────────────
const SiteContentContext = createContext(DEFAULT_CONTENT);

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState(DEFAULT_CONTENT);

  useEffect(() => {
    api
      .get("/settings")
      .then((res) => {
        if (res.data?.content) {
          setContent(deepMerge(DEFAULT_CONTENT, res.data.content));
        }
      })
      .catch(() => {
        // Hata olursa varsayılan metinler kullanılmaya devam eder
      });
  }, []);

  return (
    <SiteContentContext.Provider value={content}>
      {children}
    </SiteContentContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useSiteContent() {
  return useContext(SiteContentContext);
}

export default SiteContentContext;

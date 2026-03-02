import React, { useState, useEffect, useRef } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";
import { useSiteContent } from "../../context/SiteContentContext";
import {
  Save,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Monitor,
  PenSquare,
} from "lucide-react";

// ─── Bölüm tanımları ──────────────────────────────────────────────────────────
const SECTIONS = [
  {
    key: "hero",
    label: "🏠 Hero (Ana Sayfa Girişi)",
    fields: [
      { key: "title", label: "Ana Başlık", multiline: false },
      { key: "subtitle", label: "Alt Başlık", multiline: false },
      { key: "buttonText", label: "Buton Metni", multiline: false },
    ],
  },
  {
    key: "intro",
    label: "📌 Giriş Bölümü",
    fields: [
      { key: "badge", label: "Rozet Metni (Badge)", multiline: false },
      { key: "badgeText", label: "Rozet Açıklaması", multiline: true },
      { key: "title", label: "Ana Başlık", multiline: false },
      { key: "titleHighlight", label: "Vurgulu Başlık Kısım", multiline: false },
      { key: "text", label: "Açıklama Metni", multiline: true },
      { key: "buttonText", label: "Buton Metni", multiline: false },
    ],
  },
  {
    key: "services",
    label: "🩺 Hizmetler Bölümü",
    fields: [
      { key: "title", label: "Bölüm Başlığı", multiline: false },
      { key: "subtitle", label: "Alt Başlık", multiline: true },
    ],
  },
  {
    key: "about",
    label: "ℹ️ Hakkımızda Sayfası",
    fields: [
      { key: "bannerTitle", label: "Banner Başlığı", multiline: false },
      { key: "bannerDesc", label: "Banner Açıklaması", multiline: true },
      { key: "missionTitle", label: "Misyon Başlığı", multiline: false },
      { key: "missionText", label: "Misyon Açıklaması", multiline: true },
      { key: "visionTitle", label: "Vizyon Başlığı", multiline: false },
      { key: "visionText", label: "Vizyon Açıklaması", multiline: true },
      { key: "teamTitle", label: "Ekip Bölümü Başlığı", multiline: false },
      { key: "teamSubtitle", label: "Ekip Bölümü Alt Başlığı", multiline: true },
    ],
  },
  {
    key: "blog",
    label: "📝 Blog Bölümü",
    fields: [
      { key: "title", label: "Bölüm Başlığı", multiline: false },
      { key: "subtitle", label: "Alt Başlık", multiline: false },
      { key: "viewAllText", label: "Tümünü Gör Butonu", multiline: false },
    ],
  },
  {
    key: "contact",
    label: "📞 İletişim Bölümü",
    fields: [
      { key: "title", label: "Bölüm Başlığı", multiline: false },
      { key: "subtitle", label: "Alt Başlık", multiline: false },
    ],
  },
];

// ─── Ana Bileşen ──────────────────────────────────────────────────────────────
const SiteEditor = () => {
  // siteContent → context'ten gelen canlı/varsayılan değerler
  const siteContent = useSiteContent();

  // formData null iken "yükleniyor" gösterilir
  const [formData, setFormData] = useState(null);
  const [openSections, setOpenSections] = useState({ hero: true });
  const [saving, setSaving] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);
  const previewRef = useRef(null);

  // 1. Context hazır olunca formu doldur; ardından DB'den kayıtlı
  //    değerler gelirse onlarla üstüne yaz.
  useEffect(() => {
    if (!siteContent) return;

    // Önce context'teki canlı değerleri kullan (boş alanlar olmaz)
    const base = {
      hero: { ...siteContent.hero },
      intro: { ...siteContent.intro },
      services: { ...siteContent.services },
      about: { ...siteContent.about },
      blog: { ...siteContent.blog },
      contact: { ...siteContent.contact },
    };
    setFormData(base);

    // Sonra API'dan kayıtlı değerler varsa üzerine yaz
    api
      .get("/settings")
      .then((res) => {
        if (res.data?.content) {
          setFormData((prev) => ({
            hero: { ...prev.hero, ...res.data.content.hero },
            intro: { ...prev.intro, ...res.data.content.intro },
            services: { ...prev.services, ...res.data.content.services },
            about: { ...prev.about, ...res.data.content.about },
            blog: { ...prev.blog, ...res.data.content.blog },
            contact: { ...prev.contact, ...res.data.content.contact },
          }));
        }
      })
      .catch(() => {
        // API hatası olsa bile form context değerleriyle çalışır
      });
  }, [siteContent]);

  // 2. Alan değişimlerini güncelle
  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  // 3. Kaydet
  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put("/settings", { content: formData });
      toast.success("Site içerikleri başarıyla güncellendi!");
      setPreviewKey((k) => k + 1); // iframe'i yenile
    } catch (err) {
      toast.error("Kayıt sırasında hata oluştu.");
    } finally {
      setSaving(false);
    }
  };

  // 4. Accordion toggle
  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // ─── RENDER ────────────────────────────────────────────────────────────────
  if (!formData) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "300px",
          color: "#94a3b8",
          fontSize: "0.9rem",
        }}
      >
        <RefreshCw size={18} style={{ marginRight: "0.5rem" }} />
        Editör yükleniyor...
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Başlık */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
          borderBottom: "1px solid #e2e8f0",
          paddingBottom: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
              borderRadius: "0.5rem",
              padding: "0.5rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <PenSquare size={20} color="white" />
          </div>
          <div>
            <h1
              style={{
                fontSize: "1.35rem",
                fontWeight: "800",
                color: "#1e293b",
                margin: 0,
              }}
            >
              Site Editörü
            </h1>
            <p style={{ fontSize: "0.78rem", color: "#94a3b8", margin: 0 }}>
              Tüm site metin içeriklerini buradan düzenleyebilirsiniz
            </p>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            background: saving
              ? "#a5b4fc"
              : "linear-gradient(135deg,#6366f1,#8b5cf6)",
            color: "white",
            border: "none",
            borderRadius: "0.5rem",
            padding: "0.65rem 1.4rem",
            fontWeight: "700",
            fontSize: "0.9rem",
            cursor: saving ? "not-allowed" : "pointer",
            boxShadow: "0 4px 14px rgba(99,102,241,0.35)",
            transition: "all 0.2s",
          }}
        >
          {saving ? (
            <RefreshCw size={16} style={{ animation: "spin 1s linear infinite" }} />
          ) : (
            <Save size={16} />
          )}
          {saving ? "Kaydediliyor..." : "Kaydet & Yayınla"}
        </button>
      </div>

      {/* İki Sütunlu Alan */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.5rem",
          flex: 1,
          minHeight: 0,
        }}
      >
        {/* ─── SOL: ÖNZLEM ─────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            border: "1px solid #e2e8f0",
            borderRadius: "0.75rem",
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          {/* Preview başlık şeridi */}
          <div
            style={{
              background: "#f8fafc",
              padding: "0.6rem 1rem",
              borderBottom: "1px solid #e2e8f0",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Monitor size={15} color="#6366f1" />
            <span
              style={{
                fontSize: "0.8rem",
                fontWeight: "600",
                color: "#475569",
              }}
            >
              Canlı Önizleme
            </span>
            <span
              style={{
                fontSize: "0.7rem",
                color: "#94a3b8",
                marginLeft: "auto",
              }}
            >
              Kaydettiğinizde yenilenir
            </span>
          </div>

          {/* iframe */}
          <iframe
            key={previewKey}
            ref={previewRef}
            src="/"
            title="Site Önizleme"
            style={{
              flex: 1,
              border: "none",
              width: "100%",
              minHeight: "600px",
            }}
          />
        </div>

        {/* ─── SAĞ: EDITÖR ─────────────────────────────────────── */}
        <div
          style={{
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            paddingRight: "0.25rem",
          }}
        >
          {SECTIONS.map((section) => {
            const isOpen = !!openSections[section.key];
            return (
              <div
                key={section.key}
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "0.75rem",
                  overflow: "hidden",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                }}
              >
                {/* Accordion başlık */}
                <button
                  onClick={() => toggleSection(section.key)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.85rem 1.1rem",
                    background: isOpen
                      ? "linear-gradient(135deg,#eef2ff,#f5f3ff)"
                      : "#f8fafc",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "700",
                    fontSize: "0.88rem",
                    color: isOpen ? "#4f46e5" : "#334155",
                    transition: "all 0.2s",
                    borderBottom: isOpen ? "1px solid #e0e7ff" : "none",
                  }}
                >
                  <span>{section.label}</span>
                  {isOpen ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>

                {/* Accordion içerik */}
                {isOpen && (
                  <div
                    style={{
                      padding: "1rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.85rem",
                      background: "white",
                    }}
                  >
                    {section.fields.map((field) => (
                      <div key={field.key}>
                        <label
                          style={{
                            display: "block",
                            fontSize: "0.78rem",
                            fontWeight: "600",
                            color: "#64748b",
                            marginBottom: "0.35rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.04em",
                          }}
                        >
                          {field.label}
                        </label>
                        {field.multiline ? (
                          <textarea
                            value={formData[section.key][field.key] || ""}
                            onChange={(e) =>
                              handleChange(section.key, field.key, e.target.value)
                            }
                            rows={3}
                            style={{
                              width: "100%",
                              border: "1px solid #e2e8f0",
                              borderRadius: "0.5rem",
                              padding: "0.55rem 0.75rem",
                              fontSize: "0.88rem",
                              color: "#1e293b",
                              resize: "vertical",
                              outline: "none",
                              fontFamily: "inherit",
                              transition: "border-color 0.2s",
                              boxSizing: "border-box",
                            }}
                            onFocus={(e) =>
                              (e.target.style.borderColor = "#6366f1")
                            }
                            onBlur={(e) =>
                              (e.target.style.borderColor = "#e2e8f0")
                            }
                          />
                        ) : (
                          <input
                            type="text"
                            value={formData[section.key][field.key] || ""}
                            onChange={(e) =>
                              handleChange(section.key, field.key, e.target.value)
                            }
                            style={{
                              width: "100%",
                              border: "1px solid #e2e8f0",
                              borderRadius: "0.5rem",
                              padding: "0.55rem 0.75rem",
                              fontSize: "0.88rem",
                              color: "#1e293b",
                              outline: "none",
                              fontFamily: "inherit",
                              transition: "border-color 0.2s",
                              boxSizing: "border-box",
                            }}
                            onFocus={(e) =>
                              (e.target.style.borderColor = "#6366f1")
                            }
                            onBlur={(e) =>
                              (e.target.style.borderColor = "#e2e8f0")
                            }
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default SiteEditor;

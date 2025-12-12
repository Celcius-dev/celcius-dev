import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./LatestPosts.css";

// SWIPER IMPORTLARI
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

// SWIPER CSS IMPORTLARI
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// GEÇİCİ VERİ (Backend bağlanınca bu importu sileceksin)
// İsim çakışması olmasın diye 'staticPosts' olarak import ettik
import { posts as staticPosts } from "../../../data/posts";

const LatestPosts = () => {
  // 1. STATE TANIMLAMALARI
  const [posts, setPosts] = useState([]); // Ekrana basılacak veriler
  const [loading, setLoading] = useState(true); // Yükleniyor mu?
  const [error, setError] = useState(null); // Hata var mı?

  // 2. VERİ ÇEKME İŞLEMİ (Simülasyon)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        // --- GERÇEK BACKEND KODU (Hazır olunca burayı aç) ---
        // const response = await axios.get('https://api.vetcare.com/posts');
        // setPosts(response.data);

        // --- SİMÜLASYON (Backend yokken çalışacak kısım) ---
        // Sanki internetten çekiyormuşuz gibi 1.5 saniye bekletelim
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Dosyadaki veriyi state'e atıyoruz
        setPosts(staticPosts);
      } catch (err) {
        console.error("Veri çekme hatası:", err);
        setError("Yazılar yüklenirken bir sorun oluştu.");
      } finally {
        setLoading(false); // İşlem bitince loading'i kapat
      }
    };

    fetchPosts();
  }, []);

  // 3. YÜKLENİYOR EKRANI
  if (loading) {
    return (
      <section className="latest-posts-section">
        <div
          className="container"
          style={{ textAlign: "center", padding: "4rem 0" }}
        >
          {/* CSS dosyasında tanımladığımız spinner */}
          <div className="loading-spinner"></div>
          <p
            style={{ marginTop: "1rem", color: "var(--color-text-secondary)" }}
          >
            Yazılar yükleniyor...
          </p>
        </div>
      </section>
    );
  }

  // 4. HATA EKRANI
  if (error) {
    return (
      <section className="latest-posts-section">
        <div
          className="container"
          style={{ textAlign: "center", color: "#ef4444", padding: "2rem" }}
        >
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              border: "1px solid #ef4444",
              borderRadius: "8px",
              background: "transparent",
              color: "#ef4444",
              cursor: "pointer",
            }}
          >
            Tekrar Dene
          </button>
        </div>
      </section>
    );
  }

  // 5. BAŞARILI DURUM (Slider)
  return (
    <section className="latest-posts-section">
      <div className="container">
        {/* Başlık Alanı */}
        <div className="section-header">
          <h2 className="section-title">Son Yazılarımız</h2>
          <p className="section-subtitle">
            Evcil dostlarınızın sağlığı ve bakımı hakkında en güncel bilgiler.
          </p>
        </div>

        {/* SWIPER SLIDER YAPISI */}
        <div className="posts-slider-wrapper">
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className="posts-swiper"
          >
            {posts.map((post) => (
              <SwiperSlide key={post.id}>
                <Link to={`/blog/${post.id}`} className="post-card">
                  {/* Resim Alanı */}
                  <div className="post-image-wrapper">
                    <img
                      src={
                        post.image ||
                        "https://placehold.co/600x400?text=Resim+Yok"
                      }
                      alt={post.title}
                      className="post-image"
                    />
                    <span className="post-category">{post.category}</span>
                  </div>

                  {/* İçerik Alanı */}
                  <div className="post-content">
                    <span className="post-date">{post.date}</span>
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-summary">
                      {post.summary?.substring(0, 80)}...
                    </p>

                    <div className="read-more-btn">
                      Devamını Oku <span>→</span>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Tümünü Gör Butonu */}
        <div className="view-all-container">
          <a href="/blog" className="view-all-btn">
            Tüm Yazıları Gör
          </a>
        </div>
      </div>
    </section>
  );
};

export default LatestPosts;

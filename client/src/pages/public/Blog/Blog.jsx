import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../api/axios"; // Axios instance
import { Helmet } from "react-helmet-async";
import "./Blog.css";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Resimlerin sunucudaki adresi
  const UPLOAD_URL = "http://localhost:5000/uploads/";

  useEffect(() => {
    // Sayfa açıldığında en üste kaydır
    window.scrollTo(0, 0);

    const fetchPosts = async () => {
      try {
        const res = await api.get("/blogs");
        // YENİDEN ESKİYE SIRALAMA MANTIĞI (Tarihe göre)
        const sortedPosts = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPosts(sortedPosts);
      } catch (error) {
        console.error("Bloglar çekilemedi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Tarih Formatlayıcı
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div
        className="container"
        style={{ textAlign: "center", padding: "100px 0" }}
      >
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="blog-page">
      <Helmet>
        <title>Blog | VetCare Veteriner Kliniği</title>
        <meta
          name="description"
          content="VetCare Clinic uzman veteriner kadrosu ile tanışın. Evcil dostlarınız için güncel bilgiler."
        />
      </Helmet>

      <div className="container">
        {/* HEADER */}
        <div className="blog-header">
          <h1 className="blog-title">VetCare Blog</h1>
          <p className="blog-desc">
            Evcil dostlarınızın sağlığı, beslenmesi ve bakımı hakkında uzman
            veterinerlerimizden güncel bilgiler ve ipuçları.
          </p>
        </div>

        {/* POST LİSTESİ (GRID) */}
        <div className="blog-grid">
          {posts.map((post) => (
            // DİKKAT: Backend ID'si '_id' olarak gelir
            <Link to={`/blog/${post._id}`} key={post._id} className="blog-card">
              <div className="blog-card-img-wrapper">
                <img
                  // Resim URL Kontrolü (Dış link mi yoksa Upload mu?)
                  src={
                    post.image
                      ? post.image.startsWith("http")
                        ? post.image
                        : UPLOAD_URL + post.image
                      : "https://placehold.co/600x400?text=No+Image"
                  }
                  alt={post.title}
                  className={`blog-card-img object-${post.imageFit || "cover"}`} // Admin'den gelen ayar
                  loading="lazy"
                />
              </div>

              <div className="blog-card-content">
                <div className="blog-meta">
                  {/* Kategori yerine Yazar gösteriyoruz, admin panelde kategori yoktu */}
                  <span className="blog-category">Admin</span>
                  <span className="blog-date">
                    {formatDate(post.createdAt)}
                  </span>
                </div>

                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-summary">
                  {/* Özet varsa onu kullan, yoksa içerikten kırp */}
                  {post.summary
                    ? post.summary
                    : "İçerik detayı için tıklayınız..."}
                </p>

                <div className="blog-read-more">
                  Devamını Oku <span>→</span>
                </div>
              </div>
            </Link>
          ))}

          {posts.length === 0 && (
            <div
              style={{
                gridColumn: "1/-1",
                textAlign: "center",
                padding: "2rem",
                color: "#888",
              }}
            >
              Henüz blog yazısı eklenmemiş.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;

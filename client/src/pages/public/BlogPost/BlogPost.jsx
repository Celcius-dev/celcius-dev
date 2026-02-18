import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../api/axios"; // Axios
import "./BlogPost.css";
import { Helmet } from "react-helmet-async";

const BlogPost = () => {
  const { id } = useParams(); // URL'deki _id
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [prevPost, setPrevPost] = useState(null);
  const [nextPost, setNextPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // Bu URL'i kendi canlı sunucu adresinle değiştirmeyi unutma
  const UPLOAD_URL = "https://celcius-dev.onrender.com/uploads/";

  // 1. Scroll Reset ve Veri Çekme
  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchPostData = async () => {
      try {
        setLoading(true);
        // Tüm postları çekiyoruz ki önceki/sonraki mantığını kurabilelim
        const res = await api.get("/blogs");

        // Listeleme sayfasındaki aynı sıralamayı yapıyoruz
        const sortedPosts = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );

        // Şu anki postun indexini bul
        const currentIndex = sortedPosts.findIndex((p) => p._id === id);

        if (currentIndex === -1) {
          // Post bulunamadı
          setPost(null);
        } else {
          setPost(sortedPosts[currentIndex]);
          // Prev: Daha yeni olan (Index - 1)
          // Next: Daha eski olan (Index + 1)
          setPrevPost(sortedPosts[currentIndex - 1] || null);
          setNextPost(sortedPosts[currentIndex + 1] || null);
        }
      } catch (error) {
        console.error("Kunde inte ladda blogginlägget:", error); // İsveççe log
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [id]);

  // Yükleniyor Ekranı
  if (loading) {
    return (
      <div
        className="container"
        style={{ textAlign: "center", padding: "8rem 0" }}
      >
        <div className="loading-spinner"></div>
      </div>
    );
  }

  // Post Bulunamadı Ekranı
  if (!post) {
    return (
      <div
        className="container"
        style={{ textAlign: "center", padding: "8rem 0" }}
      >
        <Helmet>
          <title>Inlägget hittades inte | Celsius Blogg</title>
        </Helmet>
        <h2>Inlägget du söker hittades inte eller har tagits bort.</h2>
        <button
          onClick={() => navigate("/blog")}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            border: "1px solid var(--color-border)",
            background: "transparent",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Tillbaka till bloggen
        </button>
      </div>
    );
  }

  // Tarih Formatı (İsveççe)
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("sv-SE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <article className="blog-post-page">
      {/* DİNAMİK SEO BAŞLIĞI */}
      <Helmet>
        <title>{post.title} | Celsius Blogg</title>
        <meta
          name="description"
          content={
            post.summary ||
            "Blogginlägg och nyheter från Celsius Veterinärklinik."
          }
        />
      </Helmet>

      <div className="blog-container">
        {/* Üst Navigasyon */}
        <div className="blog-navigation-top">
          <div className="back-link" onClick={() => navigate("/")}>
            ← Hem {/* Anasayfa */}
          </div>
          <div className="back-link" onClick={() => navigate("/blog")}>
            ← Tillbaka till bloggen {/* Blog Listesi */}
          </div>
        </div>

        <header className="post-header">
          <span className="post-date">{formatDate(post.createdAt)}</span>
          <h1 className="post-title-main">{post.title}</h1>
        </header>

        {post.image && (
          <div className="post-image-container">
            <img
              src={
                post.image.startsWith("http")
                  ? post.image
                  : UPLOAD_URL + post.image
              }
              alt={post.title}
              className={`post-featured-image object-${
                post.imageFit || "cover"
              }`}
            />
          </div>
        )}

        {/* HTML İÇERİĞİ RENDER ETMEK İÇİN */}
        <div
          className="post-content ql-editor"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* --- ALT NAVİGASYON --- */}
        <nav className="post-navigation">
          {prevPost ? (
            <div
              className="nav-btn prev"
              onClick={() => navigate(`/blog/${prevPost._id}`)}
            >
              <span className="nav-label">← Föregående inlägg</span>
              <span className="nav-title">{prevPost.title}</span>
            </div>
          ) : (
            <div></div> // Boşluk korumak için
          )}

          {nextPost && (
            <div
              className="nav-btn next"
              onClick={() => navigate(`/blog/${nextPost._id}`)}
            >
              <span className="nav-label">Nästa inlägg →</span>
              <span className="nav-title">{nextPost.title}</span>
            </div>
          )}
        </nav>
      </div>
    </article>
  );
};

export default BlogPost;

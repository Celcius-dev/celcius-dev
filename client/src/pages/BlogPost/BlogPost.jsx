import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { posts } from "../../data/posts";
import "./BlogPost.css";
// Helmet Importu
import { Helmet } from "react-helmet-async";

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 1. Scroll Reset
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // 2. Mevcut postu bul
  // URL'den gelen id string olduğu için Number'a çeviriyoruz
  const currentPostIndex = posts.findIndex((p) => p.id === Number(id));
  const post = posts[currentPostIndex];

  // Post bulunamazsa hata ekranı
  if (!post) {
    return (
      <div
        className="container"
        style={{ textAlign: "center", padding: "8rem 0" }}
      >
        <Helmet>
          <title>Yazı Bulunamadı | VetCare Blog</title>
        </Helmet>
        <h2>Yazı bulunamadı.</h2>
        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            border: "1px solid var(--color-border)",
            background: "transparent",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Anasayfaya Dön
        </button>
      </div>
    );
  }

  // 3. Önceki ve Sonraki Postları Hesapla
  const prevPost = posts[currentPostIndex - 1];
  const nextPost = posts[currentPostIndex + 1];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <article className="blog-post-page">
      {/* DİNAMİK SEO BAŞLIĞI */}
      <Helmet>
        <title>{post.title} | VetCare Blog</title>
        <meta
          name="description"
          content={post.summary || "VetCare Clinic blog yazısı ve detayları."}
        />
      </Helmet>

      <div className="blog-container">
        {/* Üst Navigasyon */}
        <div className="blog-navigation-top">
          <div className="back-link" onClick={() => navigate("/")}>
            ← Anasayfa
          </div>
          <div className="back-link" onClick={() => navigate("/blog")}>
            ← Blog Listesi
          </div>
        </div>

        <header className="post-header">
          <span className="post-date">{formatDate(post.date)}</span>
          <h1 className="post-title-main">{post.title}</h1>
        </header>

        {post.image && (
          <div className="post-image-container">
            <img
              src={post.image}
              alt={post.title}
              className="post-featured-image"
            />
          </div>
        )}

        <div className="post-content">{post.content}</div>

        {/* --- ALT NAVİGASYON --- */}
        <nav className="post-navigation">
          {prevPost ? (
            <div
              className="nav-btn prev"
              onClick={() => navigate(`/blog/${prevPost.id}`)}
            >
              <span className="nav-label">← Önceki Yazı</span>
              <span className="nav-title">{prevPost.title}</span>
            </div>
          ) : (
            <div></div>
          )}

          {nextPost && (
            <div
              className="nav-btn next"
              onClick={() => navigate(`/blog/${nextPost.id}`)}
            >
              <span className="nav-label">Sonraki Yazı →</span>
              <span className="nav-title">{nextPost.title}</span>
            </div>
          )}
        </nav>
      </div>
    </article>
  );
};

export default BlogPost;

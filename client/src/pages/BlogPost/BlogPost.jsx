import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { posts } from "../../data/posts";
import "./BlogPost.css";

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 1. Scroll Reset: Sayfa değişince en tepeye at
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // 2. Mevcut postu bul
  const currentPostIndex = posts.findIndex((p) => p.id === id);
  const post = posts[currentPostIndex];

  // Post bulunamazsa hata vermesin, anasayfaya yönlendirsin veya uyarı versin
  if (!post) {
    return (
      <div
        className="container"
        style={{ textAlign: "center", padding: "5rem" }}
      >
        <h2>Yazı bulunamadı.</h2>
        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            cursor: "pointer",
          }}
        >
          Anasayfaya Dön
        </button>
      </div>
    );
  }

  // 3. Önceki ve Sonraki Postları Hesapla (Değişkenler burada tanımlı)
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
      <div className="blog-container">
        <div className="blog-navigation-top">
          <div className="back-link" onClick={() => navigate("/")}>
            ← Anasayfa
          </div>
          <div className="back-link" onClick={() => navigate("/blog")}>
            ← Blog Listesi
          </div>
        </div>
        <header className="post-header">
          <span className="post-date">{formatDate(post.createdAt)}</span>
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

        {/* --- NAVİGASYON BUTONLARI --- */}

        <nav className="post-navigation">
          {/* Önceki Post Varsa Göster */}
          {prevPost ? (
            <div
              className="nav-btn prev"
              onClick={() => navigate(`/blog/${prevPost.id}`)}
            >
              <span className="nav-label">← Önceki Yazı</span>
              <span className="nav-title">{prevPost.title}</span>
            </div>
          ) : (
            <div></div> /* Düzen bozulmasın diye boş kutu */
          )}

          {/* Sonraki Post Varsa Göster */}
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

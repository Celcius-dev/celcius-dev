import React from "react";
import { useNavigate } from "react-router-dom";
import { posts } from "../../../data/posts"; // Senin veri dosyanın yolu
import "./LatestPosts.css";

const LatestPosts = () => {
  const navigate = useNavigate();

  // 1. Postları tarihe göre sırala (Yeniden eskiye)
  // 2. İlk 4 tanesini al
  const latestPosts = [...posts]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  // Tarih formatlayıcı (Örn: 25 Kas 2025)
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("tr-TR", options);
  };

  return (
    <section className="latest-posts-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Son Yazılar</h2>
          <p className="section-subtitle">
            Evcil dostlarınızın sağlığı hakkında güncel bilgiler.
          </p>
        </div>

        <div className="posts-grid">
          {latestPosts.map((post) => (
            <article
              key={post.id}
              className="post-card"
              onClick={() => navigate(`/blog/${post.id}`)} // Tıklanınca detaya git
            >
              <div className="post-content">
                <span className="post-date">{formatDate(post.createdAt)}</span>
                <h3 className="post-title">{post.title}</h3>
                <p className="post-summary">
                  {post.summary.length > 80
                    ? post.summary.substring(0, 80) + "..."
                    : post.summary}
                </p>
                <button className="read-more-btn">
                  Devamını Oku <span>→</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Eğer 4'ten fazla post varsa "Tümünü Gör" butonu koyabiliriz */}
        <div className="view-all-container">
          <button className="view-all-btn" onClick={() => navigate("/blog")}>
            Tüm Yazıları Gör
          </button>
        </div>
      </div>
    </section>
  );
};

export default LatestPosts;

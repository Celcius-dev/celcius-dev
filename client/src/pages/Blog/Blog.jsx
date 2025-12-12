import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { posts } from "../../data/posts"; // Veri dosyanız
import "./Blog.css";

const Blog = () => {
  // Sayfa açıldığında en üste kaydır
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // YENİDEN ESKİYE SIRALAMA MANTIĞI
  // ID'si büyük olan (son eklenen) en başta gözüksün.
  // [...posts] diyerek orijinal diziyi bozmadan kopyasını sıralıyoruz.
  const sortedPosts = [...posts].sort((a, b) => b.id - a.id);

  return (
    <div className="blog-page">
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
        {/* Artık filtre yok, direkt sıralanmış listeyi basıyoruz */}
        <div className="blog-grid">
          {sortedPosts.map((post) => (
            <Link to={`/blog/${post.id}`} key={post.id} className="blog-card">
              <div className="blog-card-img-wrapper">
                <img
                  src={post.image}
                  alt={post.title}
                  className="blog-card-img"
                  loading="lazy"
                />
              </div>

              <div className="blog-card-content">
                <div className="blog-meta">
                  <span className="blog-category">{post.category}</span>
                  <span className="blog-date">{post.date}</span>
                </div>

                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-summary">
                  {post.summary.substring(0, 100)}...
                </p>

                <div className="blog-read-more">
                  Devamını Oku <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;

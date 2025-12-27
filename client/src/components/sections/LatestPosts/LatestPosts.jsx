import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../../api/axios"; // Axios bağlantısı
import { Calendar, User, ArrowRight } from "lucide-react";

// --- SWIPER IMPORTLARI ---
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./LatestPosts.css"; // CSS Dosyanız

const LatestPosts = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Backend'den resim yüklemek için URL
  const UPLOAD_URL = "http://localhost:5000/uploads/";

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        // 1. Veriyi Çek
        const res = await api.get("/blogs");

        // 2. Tarihe göre sırala (En yeni en üstte)
        const sortedBlogs = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        // 3. Slider için son 6 yazıyı al
        setBlogs(sortedBlogs.slice(0, 6));
      } catch (err) {
        console.error("Bloglar yüklenirken hata:", err);
        setError("Blog yazıları şu an görüntülenemiyor.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Yükleniyor Durumu
  if (loading) {
    return (
      <section className="latest-posts-section py-16">
        <div className="container text-center">
          <div className="loading-spinner mx-auto"></div>
          <p className="mt-4 text-gray-500">Yazılar yükleniyor...</p>
        </div>
      </section>
    );
  }

  // Hata Durumu (Opsiyonel: Boş dönebilirsin)
  if (error) return null;

  return (
    <section className="latest-posts-section py-16 bg-white" id="blog">
      <div className="container mx-auto px-4">
        {/* Başlık Alanı */}
        <div className="section-header text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Güncel Blog Yazıları
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Evcil dostlarınızın sağlığı, bakımı ve beslenmesi hakkında uzman
            hekimlerimizden ipuçları.
          </p>
        </div>

        {/* --- SWIPER SLIDER --- */}
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1 }, // Mobilde 1 tane
            768: { slidesPerView: 2 }, // Tablette 2 tane
            1024: { slidesPerView: 3 }, // Masaüstünde 3 tane
          }}
          className="latest-posts-swiper pb-12"
        >
          {blogs.map((blog) => (
            <SwiperSlide key={blog._id}>
              <div className="blog-card bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 h-full flex flex-col">
                {/* Resim Alanı */}
                <div className="h-56 overflow-hidden relative group">
                  <img
                    src={
                      blog.image
                        ? blog.image.startsWith("http")
                          ? blog.image
                          : UPLOAD_URL + blog.image
                        : "https://placehold.co/600x400?text=Klinik+Blog"
                    }
                    alt={blog.title}
                    className={`w-full h-full transition-transform duration-500 group-hover:scale-110 card-image`}
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm">
                    Blog
                  </div>
                </div>

                {/* İçerik Alanı */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Tarih ve Yazar */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} className="text-blue-500" />
                      {new Date(blog.createdAt).toLocaleDateString("tr-TR")}
                    </span>
                    <span className="flex items-center gap-1">
                      <User size={14} className="text-blue-500" />
                      Admin
                    </span>
                  </div>

                  {/* Başlık */}
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
                  </h3>

                  {/* Özet */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                    {blog.summary}
                  </p>

                  {/* Buton */}
                  <Link
                    to={`/blog/${blog._id}`}
                    className="inline-flex items-center text-blue-600 font-semibold text-sm hover:gap-2 transition-all mt-auto"
                  >
                    Devamını Oku <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Eğer hiç blog yoksa */}
          {blogs.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              Henüz blog yazısı eklenmemiş.
            </div>
          )}
        </Swiper>

        {/* Tümünü Gör Butonu */}
        <div className="text-center mt-8">
          <Link
            to="/blog"
            className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-8 rounded-full transition duration-300"
          >
            Tüm Yazıları İncele
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestPosts;

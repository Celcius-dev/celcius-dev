import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout.jsx";

// Sayfalar (Pages)
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Appointment from "./pages/Appointment.jsx";
import Blog from "./pages/Blog.jsx";
import BlogPost from "./pages/BlogPost/BlogPost.jsx"; // Yeni oluşturacağımız detay sayfası
import Contact from "./pages/Contact.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Anasayfa */}
        <Route index element={<Home />} />
        {/* Statik Sayfalar */}
        <Route path="about" element={<About />} />
        <Route path="appointment" element={<Appointment />} />
        <Route path="contact" element={<Contact />} />
        {/* Blog Rotaları */}
        <Route path="blog" element={<Blog />} /> {/* Tüm yazıların listesi */}
        <Route path="blog/:id" element={<BlogPost />} />
        {/* 404 Rotası */}
        <Route
          path="*"
          element={
            <div
              className="container"
              style={{ padding: "5rem", textAlign: "center" }}
            >
              Sayfa Bulunamadı (404)
            </div>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;

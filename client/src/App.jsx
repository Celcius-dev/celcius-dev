import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout.jsx";
import React, { Suspense, lazy } from "react";
import Header from "./components/layout/Header/Header.jsx";
import Footer from "./components/layout/Footer/Footer.jsx";

// Sayfalar (Pages)
const Home = lazy(() => import("./pages/Home.jsx"));
const About = lazy(() => import("./pages/About/About.jsx"));
const ServicesSection = lazy(() =>
  import("./components/sections/Services/Services.jsx")
); // Eğer sayfa olarak kullanıyorsan
const Service = lazy(() => import("./pages/Service/ServiceDetail.jsx"));
const Blog = lazy(() => import("./pages/Blog/Blog.jsx")); // Blog.jsx
const BlogPost = lazy(() => import("./pages/BlogPost/BlogPost.jsx"));
const Contact = lazy(() => import("./pages/Contact/Contact.jsx"));
const Appointment = lazy(() => import("./pages/Appointment/Appointment"));
function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        {/* Suspense: Sayfa yüklenirken gösterilecek geçici bileşen */}
        <Suspense
          fallback={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <div className="loading-spinner"></div>{" "}
              {/* CSS'te tanımladığımız spinner */}
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services/:id" element={<Service />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/appointment" element={<Appointment />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;

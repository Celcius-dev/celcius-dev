import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layouts
import MainLayout from "./layouts/MainLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";

// Components
import PrivateRoute from "./components/PrivateRoute.jsx";

// --- SAYFALAR (LAZY LOAD) ---

// Public Sayfalar
const Home = lazy(() => import("./pages/public/Home.jsx"));
const About = lazy(() => import("./pages/public/About/About.jsx"));
const Service = lazy(() => import("./pages/public/Service/ServiceDetail.jsx")); // Public taraftaki detay
const Blog = lazy(() => import("./pages/public/Blog/Blog.jsx"));
const BlogPost = lazy(() => import("./pages/public/BlogPost/BlogPost.jsx"));
const Contact = lazy(() => import("./pages/public/Contact/Contact.jsx"));
const Appointment = lazy(() =>
  import("./pages/public/Appointment/Appointment")
);

// Admin Sayfalar
const Login = lazy(() => import("./pages/admin/Login"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));

// Blog Yönetimi
const BlogList = lazy(() => import("./pages/admin/BlogList"));
const BlogForm = lazy(() => import("./pages/admin/BlogForm"));

// Doktor Yönetimi
const DoctorList = lazy(() => import("./pages/admin/DoctorList"));
const DoctorForm = lazy(() => import("./pages/admin/DoctorForm"));

// Hizmet Yönetimi
const AdminServices = lazy(() => import("./pages/admin/AdminServices.jsx"));
const AdminServicesForm = lazy(() =>
  import("./pages/admin/AddServicesForm.jsx")
);

// Hasta (Mutlu Patiler) Yönetimi -- YENİ EKLENDİ
const PatientList = lazy(() => import("./pages/admin/PatientList"));
const PatientForm = lazy(() => import("./pages/admin/PatientForm"));

// Ayarlar
const Settings = lazy(() => import("./pages/admin/Settings"));

// Yükleniyor Ekranı (Spinner)
const LoadingSpinner = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <div className="loading-spinner"></div>
  </div>
);

function App() {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* --- 1. GRUP: NORMAL KULLANICI SAYFALARI --- */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services/:id" element={<Service />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/appointment" element={<Appointment />} />
          </Route>

          {/* --- 2. GRUP: ADMIN PANELİ --- */}

          {/* Login Sayfası */}
          <Route path="/admin/login" element={<Login />} />

          {/* Korumalı Admin Sayfaları */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminLayout />
              </PrivateRoute>
            }
          >
            {/* Dashboard */}
            <Route index element={<Dashboard />} />

            {/* Blog Yönetimi */}
            <Route path="blogs" element={<BlogList />} />
            <Route path="blogs/new" element={<BlogForm />} />
            <Route path="blogs/edit/:id" element={<BlogForm />} />

            {/* Doktor Yönetimi */}
            <Route path="doctors" element={<DoctorList />} />
            <Route path="doctors/new" element={<DoctorForm />} />
            <Route path="doctors/edit/:id" element={<DoctorForm />} />

            {/* Hizmet Yönetimi */}
            <Route path="services" element={<AdminServices />} />
            <Route path="services/new" element={<AdminServicesForm />} />
            <Route path="services/edit/:id" element={<AdminServicesForm />} />

            {/* Hasta (Mutlu Patiler) Yönetimi -- YENİ EKLENDİ */}
            <Route path="patients" element={<PatientList />} />
            <Route path="patients/new" element={<PatientForm />} />
            <Route path="patients/edit/:id" element={<PatientForm />} />

            {/* Ayarlar */}
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Suspense>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;

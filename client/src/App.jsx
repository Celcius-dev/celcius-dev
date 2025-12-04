import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";

// Sayfaların import edilmesi
import Home from "./pages/Home";
import About from "./pages/About";
import Appointment from "./pages/Appointment";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} /> {/* Anasayfa (localhost:5173/) */}
        <Route path="about" element={<About />} />{" "}
        {/* Hakkımızda (domain/about) */}
        <Route path="appointment" element={<Appointment />} />{" "}
        {/* Randevu (domain/appointment) */}
        <Route path="blog" element={<Blog />} /> {/* Blog (domain/blog) */}
        <Route path="contact" element={<Contact />} />
        {/* İletişim (domain/contact) */}
      </Route>
    </Routes>
  );
}

export default App;

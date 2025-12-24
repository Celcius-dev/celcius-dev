import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";

// Enviroment Variables
dotenv.config();

// Database Connection
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware (Ara yazılımlar)
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/settings", settingsRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Veteriner Kliniği API Çalışıyor! 🐶🐱");
});

// Server Start
app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});

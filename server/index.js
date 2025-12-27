import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import serviceRoutes from "./routes/servicesRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

import path from "path";

// Enviroment Variables
dotenv.config();

// Database Connection
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware (Ara yazılımlar)
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Test Route
app.get("/", (req, res) => {
  res.send("Veteriner Kliniği API Çalışıyor! 🐶🐱");
});

// Server Start
app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});

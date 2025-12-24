import express from "express";
import {
  getBlogs,
  createBlog,
  deleteBlog,
} from "../controllers/blogController.js";
import { verifyToken } from "../middleware/authMiddleware.js"; // <-- Korumayı çağırdık

const router = express.Router();

// Okuma herkes açıktır (verifyToken yok)
router.get("/", getBlogs);

// Ekleme ve Silme işlemleri korumalıdır (verifyToken VAR)
router.post("/", verifyToken, createBlog);
router.delete("/:id", verifyToken, deleteBlog);

export default router;

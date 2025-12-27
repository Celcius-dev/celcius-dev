import express from "express";
import {
  getBlogs,
  createBlog,
  deleteBlog,
  getBlogById,
  updateBlog,
} from "../controllers/blogController.js";
import { verifyToken } from "../middleware/authMiddleware.js"; // <-- Korumayı çağırdık

const router = express.Router();

// Okuma herkes açıktır (verifyToken yok)
router.get("/", getBlogs);

// Ekleme ve Silme işlemleri korumalıdır (verifyToken VAR)
router.get("/:id", getBlogById);
router.post("/", verifyToken, createBlog);
router.put("/:id", verifyToken, updateBlog);
router.delete("/:id", verifyToken, deleteBlog);

export default router;

import Blog from "../models/Blog.js";

// Tüm blogları getir (Herkese açık)
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }); // En yeniden eskiye
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Yeni blog ekle (Sadece Admin)
export const createBlog = async (req, res) => {
  try {
    const { title, image, content } = req.body;
    const newBlog = new Blog({ title, image, content });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Blog sil (Sadece Admin)
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    await Blog.findByIdAndDelete(id);
    res.status(200).json({ message: "Blog yazısı silindi." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: "Blog bulunamadı" });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Blog güncelle
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    // new: true diyerek güncellenmiş halini döndürmesini sağlıyoruz
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const Blog = require('../models/Blog');

const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = await Blog.create({ title, content, authorId: req.user.id });
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByPk(id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    if (blog.authorId !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await blog.update(req.body);
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByPk(id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    if (blog.authorId !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await blog.destroy();
    res.status(204).send({message: 'Blog deleted successfully'});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};

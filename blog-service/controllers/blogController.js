const Blog = require('../../shared/models/Blog');
const { paginate } = require('sequelize-paginate'); // Import pagination utility

// Add pagination functionality to the Blog model
paginate(Blog);

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
    const { page = 1, pageSize = 10 } = req.query; // Default to page 1, 10 items per page
    const options = {
      page: parseInt(page, 10),
      paginate: parseInt(pageSize, 10),
      order: [['createdAt', 'DESC']],
    };

    const { docs, pages, total } = await Blog.paginate(options);

    res.status(200).json({
      blogs: docs,
      pagination: {
        currentPage: options.page,
        totalPages: pages,
        totalItems: total,
        pageSize: options.paginate,
      },
    });
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
    res.status(204).json({ message: 'Blog deleted successfully' });
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

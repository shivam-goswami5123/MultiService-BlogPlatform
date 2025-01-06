const express = require('express');
const {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogController');
const {authenticate} = require('../../shared/middleware/authMiddleware');

const router = express.Router();

router.get('/health-check', async (req, res) => {
  res.status(200).json({message:'User service is up and running'});
});
router.post('/', authenticate, createBlog);
router.get('/', getBlogs);
router.get('/:id', getBlogById);
router.put('/:id', authenticate, updateBlog);
router.delete('/:id', authenticate, deleteBlog);


module.exports = router;

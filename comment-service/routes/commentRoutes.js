const express = require('express');
const {
    createComment,
    getCommentsByPost,
    // updateComment,
    // deleteComment,
} = require('../controllers/commentController');
const {authenticate} = require('../../shared/middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticate, createComment);
router.get('/', getCommentsByPost);
// router.put('/:id', authenticate, updateComment);
// router.delete('/:id', authenticate, deleteComment);

module.exports = router;

const Comment = require('../models/Comment');


// Helper function to nest comments
const nestComments = (comments) => {
    const commentMap = {};

    comments.forEach((comment) => {
        commentMap[comment.id] = { ...comment.dataValues, children: [] };
    });

    const nestedComments = [];

    comments.forEach((comment) => {
        if (comment.parentId) {
            if (commentMap[comment.parentId]) {
                commentMap[comment.parentId].children.push(commentMap[comment.id]);
            }
        } else {
            nestedComments.push(commentMap[comment.id]);
        }
    });

    return nestedComments;
};

// Create a new comment
// const createComment = async (req, res) => {
//     try {
//         const { postId, content } = req.body;
//         const authorId = req.user.id;

//         const comment = await Comment.create({ postId, content, authorId });
//         res.status(201).json(comment);
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to create comment', error: error.message });
//     }
// };

// Add a new comment (supports nested comments)
const createComment = async (req, res) => {
    try {
        const { content, postId, parentId } = req.body;
        const authorId = req.user.id;
        console.log(authorId);

        const comment = await Comment.create({
            postId,
            content,
            authorId,
            parentId: parentId || null, // If no parentId is provided, set to null   
        });

        res.status(201).json({
            message: 'Comment added successfully',
            comment,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to add comment',
            error: error.message,
        });
    }
};



// Get comments for a specific blog post
// const getCommentsByPost = async (req, res) => {
//     try {
//         const { postId } = req.query;
//         const comments = await Comment.findAll({ where: { postId } });

//         res.status(200).json(comments);
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to fetch comments', error: error.message });
//     }
// };

// Get comments for a specific blog post with nested structure
const getCommentsByPost = async (req, res) => {
    try {
        const { postId } = req.query;

        const comments = await Comment.findAll({
            where: { postId },
            order: [['createdAt', 'ASC']], // Sorting comments by createdAt
        });

        const nestedComments = nestComments(comments);

        res.status(200).json({
            message: 'Comments retrieved successfully',
            comments: nestedComments,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to retrieve comments',
            error: error.message,
        });
    }
};

// Update a comment
// const updateComment = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { content } = req.body;

//         const comment = await Comment.findByPk(id);
//         if (!comment) {
//             return res.status(404).json({ message: 'Comment not found' });
//         }

//         if (comment.authorId !== req.user.id) {
//             return res.status(403).json({ message: 'Unauthorized to update this comment' });
//         }

//         comment.content = content;
//         await comment.save();

//         res.status(200).json(comment);
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to update comment', error: error.message });
//     }
// };

// // Delete a comment
// const deleteComment = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const comment = await Comment.findByPk(id);
//         if (!comment) {
//             return res.status(404).json({ message: 'Comment not found' });
//         }

//         if (comment.authorId !== req.user.id) {
//             return res.status(403).json({ message: 'Unauthorized to delete this comment' });
//         }

//         await comment.destroy();
//         res.status(200).json({ message: 'Comment deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to delete comment', error: error.message });
//     }
// };

module.exports = {
    createComment,
    getCommentsByPost,
    // updateComment,
    // deleteComment,
};

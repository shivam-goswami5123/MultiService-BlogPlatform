const User = require('../models/User');
const Blog = require('../models/Blog');
const Comment = require('../models/Comment');

// User and Blog Association
User.hasMany(Blog, { foreignKey: 'authorId', as: 'blogs' });
Blog.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

// User and Comment Association
User.hasMany(Comment, { foreignKey: 'authorId', as: 'comments' });
Comment.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

// Blog and Comment Association
Blog.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });
Comment.belongsTo(Blog, { foreignKey: 'postId', as: 'post' });

// Self-referencing for nested comments
Comment.hasMany(Comment, { foreignKey: 'parentId', as: 'children' });
Comment.belongsTo(Comment, { foreignKey: 'parentId', as: 'parent' });

module.exports = () => {
    console.log('Associations are successfully set up');
};

const User = require('../models/User');
const Blog = require('../models/Blog');

// Define the relationship (One user can have many blogs)
User.hasMany(Blog, { foreignKey: 'authorId', as: 'blogs' });

// Define the relationship (A blog belongs to one user)
Blog.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

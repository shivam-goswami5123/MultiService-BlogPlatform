const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../db/db');
const Blog = require('./Blog');
const User = require('./User');

const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    postId: {
        type: DataTypes.UUID, // Link to Blog post
        allowNull: false,
        references: {
              model: Blog,
              key: 'id',
        },
    },

    parentId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'Comments',
            key: 'id',
        },
    },

    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

    authorId: {
        type: DataTypes.UUID, // Link to User
        allowNull: false,
        references: {
              model: User,
              key: 'id',
        },
    },
}, {
    schema: 'Comment',
    timestamps: true,
});

module.exports = Comment;

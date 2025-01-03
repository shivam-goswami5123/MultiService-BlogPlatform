const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db'); // Ensure your sequelize instance is correctly imported



const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID, // Use UUID for consistency
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
});



module.exports = User;

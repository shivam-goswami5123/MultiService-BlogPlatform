const { Sequelize } = require('sequelize');
const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = require('../config');

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to PostgreSQL');

        // Synchronize all models with the database
        await sequelize.sync({ force: false }); // Use { force: true } to drop and recreate the table
        console.log('Database synchronized');
    } catch (error) {
        console.error('Unable to connect to PostgreSQL:', error.message);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };
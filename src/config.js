require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3000,
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: process.env.DB_PORT || 5432,
    DB_NAME: process.env.DB_NAME || 'blog_platform',
    DB_USER: process.env.DB_USER || 'postgres',
    DB_PASSWORD: process.env.DB_PASSWORD || 'your_password',
    JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
};

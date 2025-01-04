require('dotenv').config();

if (!process.env.DB_USER || !process.env.DB_PASSWORD) {
    throw new Error('Missing required environment variables');
}

module.exports = {
    DB_HOST: process.env.DB_HOST ,
    DB_PORT: process.env.DB_PORT,
    DB_NAME: process.env.DB_NAME ,
    DB_USER: process.env.DB_USER ,
    DB_PASSWORD: process.env.DB_PASSWORD ,
    JWT_SECRET: process.env.JWT_SECRET 
};

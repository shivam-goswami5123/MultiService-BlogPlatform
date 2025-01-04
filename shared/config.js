require('dotenv').config();

module.exports = {
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_PORT: process.env.DB_PORT || 5432,
    DB_NAME: process.env.DB_NAME || "blog-web-app" ,
    DB_USER: process.env.DB_USER || "postgres",
    DB_PASSWORD: process.env.DB_PASSWORD || "PaRRot&8426" ,
    JWT_SECRET: process.env.JWT_SECRET || "iamdevlopingcodingblocksproject"
};

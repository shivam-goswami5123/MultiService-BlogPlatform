const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const { connectDB } = require('../shared/db/db');

const PORT=3001;

// Load models before associations are imported
require('../shared/models/User');
require('../shared/models/Blog');
require('../shared/models/Comment');

// Import associations after models are loaded
require('../shared/associations')(); // Associations should be defined after models are loaded

const app = express();
app.use(bodyParser.json());
app.use('/api/users', userRoutes);

// Start the server only after the database connection is established
const startServer = async () => {
    try {
        await connectDB(); // Wait for the database connection to establish
        app.listen(PORT, () => {
            console.log(`User Service running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server due to database connection error:', error);
        process.exit(1); // Exit the process if the DB connection fails
    }
};

startServer();

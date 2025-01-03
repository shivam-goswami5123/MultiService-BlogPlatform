const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const commentRoutes = require('./routes/commentRoutes');
const { connectDB } = require('./db/db');
const { PORT } = require('./config');


// Import models
require('./models/User');   
require('./models/Blog');
require('./models/Comment');

// Import associations after models are loaded
require('./db/associations')();  // Associations should be defined after models are loaded

const app = express();
app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/blog', blogRoutes);
app.use('/api/comments', commentRoutes);

connectDB();

app.listen(PORT, () => {
    console.log(`User Service running on port ${PORT}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const { connectDB } = require('./db/db');
const { PORT } = require('./config');

const app = express();
app.use(bodyParser.json());
app.use('/api/users', userRoutes);

connectDB();

app.listen(PORT, () => {
    console.log(`User Service running on port ${PORT}`);
});

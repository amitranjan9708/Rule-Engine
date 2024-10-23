const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const ruleRoutes = require('./routes/ruleRoutes');

dotenv.config();
connectDB();
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS
// API routes
app.use('/api', ruleRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

module.exports = app;

const mongoose = require('mongoose');
require('dotenv').config();

/**
 * Start DB Connection
 */
const DB = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
mongoose.connect(DB, { useMongoClient: true })
        .then(() => console.log('MongoDB connection success'))
        .catch(error => console.error('MongoDB connection error ::', error));
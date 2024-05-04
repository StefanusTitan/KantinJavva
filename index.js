const express = require('express');
const cors = require('cors');
const multer = require('./middleware/multer'); // Import multer configuration from multer.js
const userRouter = require('./routes/userRoutes');
const itemRouter = require('./routes/itemRoutes');
const cartRouter = require('./routes/cartRoutes');
const mejaRouter = require('./routes/mejaRoutes');
const transactionRouter = require('./routes/transactionRoutes');

const app = express();

const bodyParser = require('body-parser');

// Increase the request body size limit
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Middleware for parsing JSON
app.use(express.json());

// Middleware for enabling CORS
app.use(cors());

// Middleware for handling file uploads with Multer
app.use(multer.single('image')); // Use multer middleware

// Custom middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
  });
// Mounting routers
app.use('/user', userRouter);
app.use('/item', itemRouter);
app.use('/cart', cartRouter);
app.use('/meja', mejaRouter);
app.use('/transaction', transactionRouter);

module.exports = app;

const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/userRoutes');
const itemRouter = require('./routes/itemRoutes');
const cartRouter = require('./routes/cartRoutes');
const mejaRouter = require('./routes/mejaRoutes');
const transactionRouter = require('./routes/transactionRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const bookingRouter = require('./routes/bookingRoutes');

const app = express();

// Middlewares

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'))
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use('/user', userRouter);
app.use('/item', itemRouter);
app.use('/cart', cartRouter);
app.use('/meja', mejaRouter);
app.use('/transaction', transactionRouter);
app.use('/review', reviewRouter);
app.use('/booking', bookingRouter);

module.exports = app;
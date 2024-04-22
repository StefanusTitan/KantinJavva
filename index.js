const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/userRoutes');
const itemRouter = require('./routes/itemRoutes');
const cartRouter = require('./routes/cartRoutes');

const app = express();

// Middlewares

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use('/user', userRouter);
app.use('/item', itemRouter);
app.use('/cart', cartRouter);

module.exports = app;
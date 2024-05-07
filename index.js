const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const { connectdb } = require('./db');
const { verifyToken, verifyTokenAndAdmin } = require("./middleware/auth");
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart');
const orderRouter = require('./routes/order');

const port = 8050;

app.use(morgan('dev'));
app.use(cors());

app.use(express.json());
app.use('/auth', authRouter);
app.use('/users', verifyToken, userRouter);
app.use('/products', verifyTokenAndAdmin, productRouter);
app.use('/carts', verifyToken, cartRouter);
app.use('/orders', verifyToken, orderRouter);

app.get("/", (req, res) => {
    res.send("API inafanya kazi sasa enda uimalizie kazi yako").status(200);
});

const start_server = () => {
    connectdb();
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
};

start_server();

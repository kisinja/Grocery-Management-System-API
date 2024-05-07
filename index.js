const express = require('express');
const app = express();

const { connectdb } = require('./db');
const { verifyToken, verifyTokenAndAdmin } = require("./middleware/auth");
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const productRouter = require('./routes/product');

const port = 8050;

app.use(express.json());
app.use('/auth', authRouter);
app.use('/users', verifyToken, userRouter);
app.use('/products', verifyTokenAndAdmin, productRouter);

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

const express = require('express');
const app = express();

const {connectdb} = require('./db');
const port = 8050;

const start_server =  () => {
    connectdb();
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
};

start_server();

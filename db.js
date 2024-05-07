const mongoose = require("mongoose");

const connection_url = "mongodb://127.0.0.1:27017/jwt-practice";

const connectdb = () => {
    mongoose.connect(connection_url).then(() => console.log("Database connected successfully!!"))
}

module.exports.connectdb = connectdb;

const express = require('express');
const router = express.Router();

const User = require("../models/user");
const { getUsers } = require("../controllers/users");


router.get("/", getUsers);

module.exports = router;
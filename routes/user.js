const express = require('express');
const router = express.Router();

const User = require("../models/user");
const { getUsers, getUserProfile } = require("../controllers/users");


router.get("/", getUsers);
router.get("/", getUserProfile);

module.exports = router;
const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");
const {getUserCart, deleteCart, updateCart, addCart, getCarts} = require("../controllers/cart");

router.post("/", addCart);

router.get("/:userId", getUserCart);

router.delete("/:id", deleteCart);

router.put("/:id", updateCart);

router.get("/", getCarts);

module.exports = router;
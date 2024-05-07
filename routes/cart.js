const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");
const {getUserCart, deleteCart, updateCart, addCart} = require("../controllers/cart");

router.post("/", addCart);

router.get("/:userId", getUserCart);

router.delete("/:id", deleteCart);

router.put("/:id", updateCart);

router.get("/", async (req, res) => {
    try {
        const cart = await Cart.find();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json(error);
        console.error(error.message);
    }
});

module.exports = router;
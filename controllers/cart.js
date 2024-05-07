const Cart = require("../models/cart");

const getCarts = async (req, res) => {
    if (req.user.role === "admin") {
        try {
            const carts = await Cart.find();
            res.status(200).send(carts);
        } catch (error) {
            res.status(500).send(error);
        }
    } else {
        const cart = await Cart.findOne({ user: req.user.id });
        if (cart) {
            res.send(cart).status(200);
        } else {
            res.status(404).send("Your cart is empty :(");
        }
    }
}

const getUserCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        if (cart) return res.status(200).send(cart);
        else return res.status(404).send("Cart not found");
    } catch (error) {
        res.status(500).send(error);
        console.error(error.message);
    }
};

const deleteCart = async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart deleted successfully");
    } catch (error) {
        res.status(500).json(error);
        console.error(error.message);
    }
}

const updateCart = async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json(error);
        console.error(error.message);
    }
}

const addCart = async (req, res) => {
    const newCart = new Cart(req.body);
    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (error) {
        res.status(500).json(error);
        console.error(error.message);
    }
}

module.exports = {
    getUserCart,
    deleteCart,
    updateCart,
    addCart,
    getCarts
}
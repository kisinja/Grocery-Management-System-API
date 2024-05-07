const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");

const getCarts = async (req, res) => {
    try {
        const cart = await Cart.find();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json(error);
        console.error(error.message);
    }
}


const getUserCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        res.status(200).send(cart);
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
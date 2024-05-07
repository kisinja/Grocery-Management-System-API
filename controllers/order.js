const Order = require("../models/order");

const getOrders = async (req, res) => {
    if (req.user.role == "admin") {
        try {
            const orders = await Order.find().populate("user", "name email");
            if (orders) {
                return res.send(orders).status(200);
            } else {
                return res.status(404).send({ message: "No orders found" });
            }
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    } else {
        const order = await Order.findOne({ user: req.user.id });
        if (order) {
            return res.send(order).status(200);
        } else {
            return res.status(404).send({ message: "You have no orders :(" });
        }
    }
}

const createOrder = async (req, res) => {
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        return res.send(savedOrder).status(201);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
}

const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error.message);
    }
}

const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if(deletedOrder) {
            return res.status(200).send({ message: "Order deleted successfully" });
        } else {
            return res.status(404).send({ message: "Order not found" });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
}

module.exports = {
    getOrders,
    createOrder,
    updateOrder,
    deleteOrder
}
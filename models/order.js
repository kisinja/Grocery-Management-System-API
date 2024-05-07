const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    total_price: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["pending", "completed", "cancelled"],
        default: "pending",
    },
}, {
    timestamps: true,
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
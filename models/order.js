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

orderSchema.pre("save", async function (next) {
    try {
        let totalPrice = 0;
        for (const item of this.products) {
            const product = await mongoose.model("Product").findById(item.product);
            totalPrice += product.price * item.quantity;
        }
        this.totalPrice = totalPrice;
        next();
    } catch (error) {
        next(error);
    }
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
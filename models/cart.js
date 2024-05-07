const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
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
                required: true,
                default:1
            },
        }
    ],
    total_price: {
        type: Number,
        required: true,
        default:0
    },
}, {
    timestamps: true,
});

// Pre-save hook to calculate total price
cartSchema.pre("save", async function (next) {
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

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
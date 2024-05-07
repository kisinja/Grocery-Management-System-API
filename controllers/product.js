const Product = require("../models/product");

const addProduct = async (req, res) => {
    const { name, price, category, description, stock, image } = req.body;

    if (!name || !price || !category || !description || !stock || !image) {
        return res.status(400).send({ message: "All fields are required" });
    }

    try {
        const newProduct = new Product({
            name: name,
            price: price,
            category: category,
            description: description,
            stock: stock,
            image: image,
        });

        const savedProduct = await newProduct.save();
        if (savedProduct) return res.status(201).send({ message: "Product added successfully" });
        else return res.status(500).send({ message: "Failed to add product" });

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
};

const getProducts = async (req, res) => {
    const products = await Product.find();
    if (products) return res.status(200).send(products);
    else return res.status(404).send({ message: "No products found" });
};

const updateProduct = async (req, res) => {
    const { name, price, category, description, stock, image } = req.body;
    const id = req.params.id;

    if (!name || !price || !category || !description || !stock || !image) {
        return res.status(400).send({ message: "All fields are required" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, {
            name: name,
            price: price,
            category: category,
            description: description,
            stock: stock,
            image: image,
        });

        if (updatedProduct) return res.status(200).send({ message: "Product updated successfully" });
        else return res.status(500).send({ message: "Failed to update product" });

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
};

//DELETE A PRODUCT
const deleteProduct = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);
    if (product) {
        res.send("Product Deleted Successfully :)");
    } else {
        res.send("No such product in the database").status(404);
    }
}

module.exports = {
    addProduct,
    getProducts,
    deleteProduct,
    updateProduct
}
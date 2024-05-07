const User = require("../models/user");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    const { name, email, password, address, phone_number, orders } = req.body;

    if (!name || !email || !password || !address || !phone_number) {
        return res.status(400).send({ message: "All fields are required" });
    } else {
        try {
            const userExist = await User.findOne({ email });
            if (userExist) return res.status(400).send({ message: "User already exists" });
            const hashedPassword = bcrypt.hashSync(password, 10);
            const newUser = new User({
                name: name,
                email: email,
                password: hashedPassword,
                address: address,
                phone_number: phone_number,
                orders: orders,
            });
            await newUser.save();
            res.status(201).send({ message: "User created successfully" });
        } catch (error) {
            console.error(error.message);
            res.status(500).send({ message: error.message });
        }
    }
}

module.exports = {
    register,
}
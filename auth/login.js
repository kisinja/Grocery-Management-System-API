const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).send({ message: `User ${email} does not exist` });

        const passwordMatch = bcrypt.compare(password, user.password);
        if (!passwordMatch) return res.status(401).send({ message: "Invalid credentials" });

        const token = jwt.sign({ user: { id: user._id } }, "elvis", { expiresIn: "1h" });

        return res.send({ token }).status(201);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
}

module.exports = {
    login,
}
const User = require("../models/user");

const getUsers = async (req, res) => {
    console.log(req.user);

    try {
        const user = await User.findById({ "_id": req.user.id });

        if (user.role === "admin") {
            const users = await User.find({});
            res.send(users).status(200);
        } else if (user.role === "user") {
            const { password, ...others } = user._doc;
            res.status(200).send(others);
        }
    } catch (error) {
        console.log(error.message);
        return res.send(500).send({ "error": error.message });
    }
};

const getUserProfile = async (req, res) => {
    const user = await User.findById({ "_id": req.user.id });
    const { password, ...others } = user._doc;
    res.status(200).send(others);
};

module.exports = {
    getUsers,
    getUserProfile
}
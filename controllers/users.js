const User = require("../models/user");

const getUsers = async(req, res) => {
    const users = await User.find();
    if (users) return res.status(200).send( users );
    else return res.status(404).send({ message: "No users found" });
};

module.exports = {
    getUsers,
}
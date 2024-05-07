const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) { return res.status(401).send({ message: "Access denied no token provided" }) } else {
        try {
            const decoded = jwt.verify(token, "elvis");
            return req.user = decoded.user;
            next();
        } catch (error) {
            return res.status(401).send({ message: "Invalid token" });
        }
    }
}

module.exports = {
    verifyToken,
}
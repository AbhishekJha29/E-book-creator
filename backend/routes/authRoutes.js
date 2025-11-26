const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });
};

exports.registerUser = async (req, res) => {
    const {name, email, password} = req.body;

    try {
        
    } catch (error) {
        res.status(500).json({message: "Serevr error"});
    }
};
// 35:00
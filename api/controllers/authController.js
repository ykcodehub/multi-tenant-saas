const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async(req, res) => {
    try{
        const { customerId, email, password, role } = req.body;

        if (!customerId || !email || !password){
            return res.status(400).json({ message: "Missing fields! fill it before login"});
        }
        const existingUser = await User.findOne({ email });
        if (existingUser){
            return res.status(400).json({ message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            customerId,
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({ message: "User Registered Successfully"});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Opps!! Server Error"});
    }
};

exports.loginUser = async (req, res) => {
    try{
        const { email, password} = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({message: "Invalid credentails"}); 
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: "Password doesn't match"});
        }
        const token = jwt.sign(
            {
                userId: user._id,
                customerId: user.customerId,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h"}
        );

        res.json({ token });

    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Opps!! Server Error"});
    }
}
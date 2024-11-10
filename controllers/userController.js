const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    console.log(req.body);
    const {username, email, password} = req.body;
    if(!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await User.findOne({email});
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered");
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username, 
        email,
        password: hashedPassword,
    });

    console.log("User has been created Successfully");

    if(user) {
        res.status(201).json({_id: user.id, email: user.email});
    }
    else {
        res.status(400);
        throw new Error("User data is not valid");
    }
    res.json({message: "Register the user lmao"});
});

//@desc Login a user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({email});
    
    // compare password with hashed password
    if ( user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            }            
        }, process.env.ACCESS_TOKEN,
        // change the expiration time later
        {expiresIn: "10m"}
        );
        res.status(200).json({accessToken}); 
    }
    else {
        res.status(401);
        throw new Error("Email or password not valid");
    }
});

//@desc Current user
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    console.log("trying to get current user info  ...");
    if(!req.user) {
        return res.status(401).json({message: "not signed in"});
    }
    res.json(req.user);
});

module.exports = {registerUser, loginUser, currentUser};
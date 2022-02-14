const jwt =  require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');

const User = require('../models/user');

//@desc     Get user data
//@route    GET /api/users/me
//@access   private
const getMe = asyncHandler(async(req, res) => {
    const {_id, name, email, ssn} = await User.findById(req.user.id);

    return res.status(200).json({
        id:_id,
        name:name, 
        email:email,
        ssn:ssn
    })

})

//@desc     Authenticate a user
//@route    GET /api/users/login
//@access   public
const loginUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});

    if(user && (await bcrypt.compare(password, user.password)))
    {
        return res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            ssn: user.ssn,
            token: generateToken(user._id),
        })
    } else {
        res.status(400);
        throw new Error('Invalid credentials');
    }
})

//@desc     Register user
//@route    GET /api/users
//@access   public
const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password, ssn} = req.body;
    console.log(name, email, password, ssn);
    
    if(!name || !email || !password){
        //ssn optional
        res.status(404);
        throw new Error('Please add all fields');
    }

    //find user by email
    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400);
        throw new Error("User already exists");
    }

    //Hash Password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password,salt);

    //Create User
    const user = await User.create({name, email, password:hashedPassword, ssn});

    if(user){
       return res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            ssn: user.ssn,
            password: hashedPassword,
        })
    } else {
        res.status(400);
        throw new Error('Invalid user data')
    }
})

const generateToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    getMe,
    loginUser
}
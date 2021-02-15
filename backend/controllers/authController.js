const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');

// Register a user => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const { name, email, password } = req.body;

    //Create User
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'avatars/kccvibpsuiusmwfepb3m',
            url: 'https://res.cloudinary.com/shopit/image/upload/v1606305757/avatars/kccvibpsuiusmwfepb3m.png'
        }
    })

    sendToken(user, 200, res);

})

// Login User => /a[i/v1/login]
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // checks if email and password is enterered by user
    if(!email || !password){
        return next(new ErrorHandler('Please enter email and password', 400))
    }

    // Finding user in database
    // we need to use select because in the model it is set to false
    const user = await User.findOne({ email }).select('+password');

    if(!user){
        return next(new ErrorHandler('Invalid Email or Password', 401))
    }

    //Check if password is correct or not
    const isPasswordMatch = await user.comparePassword(password)

    if(!isPasswordMatch) {
        return next(new ErrorHandler('Invalid Email or Password',));
    }

    sendToken(user, 200, res);

})

// Logout user = /api/v1/logout/
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, { //set token to null
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
})

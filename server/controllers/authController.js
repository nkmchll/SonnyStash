const User = require('../models/user')
const {hashPassword, comparePassword} = require('../helpers/auth')
const jwt = require('jsonwebtoken')

const test = (req, res) => {
    res.json(`test is working`)
}

// register endpoint
const registerUser = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        // check if name was entered
        if(!name){
            return res.json({
                error: 'Name is required.'
            })
        }
        // check if password is good
        if(!password || password.length < 6){
            return res.json({
                error: 'Password is required and should be at least 6 characters long.'
            })
        }
        // check email
        const exist = await User.findOne({email})
        if (exist){
            return res.json({
                error: 'Email is taken already.'
            })
        }

        const hashedPassword = await hashPassword(password)
        // create user in the database
        const user = await User.create({
            name, email, password: hashedPassword,
        })

        return res.json(user)
    } catch(error){
        console.log(error)
    }
};

// login endpoint
const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body;
        
        // check if user exists
        const user = await User.findOne({email});
        if(!user){
            return res.json({
                error: 'No user found'
            })
        }
        // check if passwords match
        const match = await comparePassword(password, user.password)
        if(match){
            jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(user)
            })

        }
        if(!match){
            res.json({
                error: "Passwords do not match"
            })
        }
    } catch (error) {
        console.log(error)
    }
}

const logoutUser = (req, res) => {
    res.clearCookie('token')
    res.json({message: 'Logout successful'})
}

const getProfile = (req, res) => {
    const {token} = req.cookies
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if(err) throw err;
            res.json(user)
        })
    }
    else{
        res.json(null)
    }
}

const addToWishList = async (req, res) => {
    const {userId, product} = req.body;
    try {
        const user = await User.findById(userId);
        if(user){
            // check if product is already in the wishlist
            const alreadyInWishlist = user.wishlist.some(item => item.product_id === product.product_id);
            if(alreadyInWishlist){
                return res.status(400).json({message: 'Product is already in your wishlist'})
            }

            // if not, add product to wishlist
            await User.updateOne(
                {_id: userId},
                {$addToSet: {wishlist: product}}
            );
            res.status(200).json({message: 'Added to wishlist'});
        } else{
            res.statur(404).json({error: 'User not found'})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Failed to add to wishlist'});
    }
};

// get wishlist endpoint
const getWishlist = async (req, res) => {
    const {userId} = req.params;
    try {
        const user = await User.findById(userId);
        if(user) {
            res.status(200).json(user.wishlist);     
        }
        else{
            res.status(404).json({error: 'User not found'})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Failed to get wishlist'})
    }
};



module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    logoutUser,
    addToWishList,
    getWishlist
}
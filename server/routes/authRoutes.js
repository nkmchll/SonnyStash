const express = require('express');
const router = express.Router();
const cors = require('cors');
const {test, registerUser, loginUser, getProfile, addToWishList, getWishlist} = require('../controllers/authController')
const {logoutUser} = require('../controllers/authController')

// middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

// test route
router.get('/', test);

// user routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getProfile);
router.post('/logout', logoutUser);

// wishlist routes
router.post('/wishlist', addToWishList);
router.get('/wishlist/:userId', getWishlist);

module.exports = router



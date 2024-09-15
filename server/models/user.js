const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    wishlist: [
        {
            product_id: String,
            product_name: String,
            product_image_url: String
        }
    ]

})

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;

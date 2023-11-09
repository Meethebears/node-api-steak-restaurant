const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: String,
    price: {
       type: Number
    },
    img: String
}, {timestamps: true})

module.exports = mongoose.model('products', productSchema)
const mongoose = require('mongoose')

const SaleItemSchema = new mongoose.Schema({
    order: [{
        productname: String,
        price: Number,
        quantity: Number,
    }],
    tablenumber : String, 
    totalprice : Number,
    updated_at: { type: Date, default: Date.now }

})

module.exports = mongoose.model('SaleItem', SaleItemSchema)
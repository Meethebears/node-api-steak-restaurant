const express = require('express')
const cors = require('cors')
const bodyPaser = require('body-parser')
const morgan = require('morgan')
const { readdirSync } = require('fs')
const connectDB = require('./Config/db')
const products = require('./Routes/product')
// const Product = require('C:/NewProject/server/Models/Products')

const app = express();

connectDB

app.use(morgan('dev'))
app.use(cors())
app.use(bodyPaser.json({ limit: '100mb' }))
app.use(bodyPaser.urlencoded({ extended: true }))

const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: String,
    price: {
       type: Number
    },
    img: String
}, {timestamps: true})

module.exports = mongoose.model('products', productSchema)

app.get('/product',async(req,res) => {
    try {
        const producted = await productSchema.find({}).exec();
        res.send(producted)
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error')
    }
})
readdirSync('./Routes')
    .map((r) => app.use('/api', require('./Routes/' + r)))

app.listen(5000, () => {
    console.log("Server Start");
})

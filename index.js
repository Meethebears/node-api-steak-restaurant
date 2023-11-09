const express = require('express')
const cors = require('cors')
const bodyPaser = require('body-parser')
const morgan = require('morgan')
const { readdirSync } = require('fs')
const connectDB = require('./Config/db')
const products = require('./Routes/product')
const Product = require('../server/Models/Products.js')

const app = express();

connectDB

app.use(morgan('dev'))
app.use(cors())
app.use(bodyPaser.json({ limit: '100mb' }))
app.use(bodyPaser.urlencoded({ extended: true }))

app.get('/product',async(req,res) => {
    try {
        const producted = await Product.find({}).exec();
        res.send(producted)
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error')
    }
})
readdirSync('./Routes')
    .map((r) => app.use('/api', require('./Routes/' + r)))

app.listen(5000, () => {
    console.log("Sever Start");
})

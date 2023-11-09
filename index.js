const express = require('express')
const cors = require('cors')
const bodyPaser = require('body-parser')
const morgan = require('morgan')
const { readdirSync } = require('fs')
const connectDB = require('./Config/db')
const products = require('./Routes/product')
const Product = require('./Models/Products')
const { default: mongoose } = require('mongoose')
mongoose.Promise = global.Promise;

const app = express();

connectDB

app.use(morgan('dev'))
app.use(cors())
app.use(bodyPaser.json({ limit: '100mb' }))
app.use(bodyPaser.urlencoded({ extended: true }))
app.use('/product', products)

// readdirSync('./Routes')
//     .map((r) => app.use('/api', require('./Routes/' + r)))

app.listen(5000, () => {
    console.log("Server Start");
})

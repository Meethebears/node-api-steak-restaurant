const express = require('express')
const cors = require('cors')
const bodyPaser = require('body-parser')
const morgan = require('morgan')
const { readdirSync } = require('fs')

const connectDB = require('./Config/db')

const app = express();

connectDB

app.use(morgan('dev'))
app.use(cors())
app.use(bodyPaser.json({ limit: '100mb' }))
app.use(bodyPaser.urlencoded({ extended: true }))

app.get('/',(req,res) => {
    res.send('This is my API running')
})
readdirSync('./Routes')
    .map((r) => app.use('/api', require('./Routes/' + r)))

app.listen(5000, () => {
    console.log("Sever Start");
})

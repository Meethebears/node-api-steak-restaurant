const express = require('express')
const router = express.Router()
// const Product = require('../Models/Products')
// const { read, list, create, update, remove } = require('../Controllers/product')

// router.get('/product', list)
// router.get('/product/:id', read)
// router.post('/product', create)
// router.put('/product/:id', update)
// router.delete('/product/:id', remove)

router.get('/',(req, res, next) => {
    Product.find((err, products) => {
        if(err) return next('!!!!!',err);
        res.json(products);
    })
})

module.exports = router;
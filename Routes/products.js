const express = require('express')
const router = express.Router()
const Product = require('../Models/Products')
const { read, list, create, update, remove, search } = require('../Controllers/product')

router.get('/product', list)
router.get('/product/search/:key', search)
router.get('/product/:id', read)
router.post('/product', create)
router.put('/product/:id', update)
router.delete('/product/:id', remove)

module.exports = router;
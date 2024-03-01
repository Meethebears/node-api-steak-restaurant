const express = require('express')
const router = express.Router()

const { create, list, read, update } = require('../Controllers/SaleItems')

router.post('/sale_items', create)
router.get('/sale_items', list)
router.get('/sale_items/:id', read)
router.put('/sale_items/:id', update)


module.exports = router
const express = require('express')
const router = express.Router()

const { create, list } = require('../Controllers/SaleItems')

router.post('/sale_items', create)
router.get('/sale_items', list)

module.exports = router
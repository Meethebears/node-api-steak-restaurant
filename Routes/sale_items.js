const express = require('express')
const router = express.Router()

const { create, list, read, update, listTotal, listTodaySales, listMonthSales, listTotalMonthSales } = require('../Controllers/SaleItems')

router.post('/sale_items', create)
router.get('/sale_items', list)
router.get('/sale_items/:id', read)
router.put('/sale_items/:id', update)
router.get('/sale_item/total-sales',listTotal)
router.get('/sale_item/today-sales',listTodaySales)
router.get('/sale_item/month-sales',listMonthSales)

module.exports = router
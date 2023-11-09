const express = require('express')
const router = express.Router()

const { create } = require('../Controllers/QRcodepromptpay')

router.post('/generateQRcode', create)

module.exports = router
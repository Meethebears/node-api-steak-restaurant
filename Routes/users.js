const express = require('express')
const router = express.Router()

const {create, read} = require('../Controllers/Users')

router.post('/login', read)
router.post('/register', create)

module.exports = router
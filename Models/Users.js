const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
    user: {
        type: String,
        unique: true,
        required: [true, 'Please provide user'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Please provide password']
    },
    role: {
        type: String,
        default: 'admin'
    },
    create_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('users', UsersSchema)
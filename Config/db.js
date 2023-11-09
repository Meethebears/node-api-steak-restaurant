const mongoose = require('mongoose')

mongoose.Promise = global.Promise;

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://admin:bank33155@cluster0.iriiwsq.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('connect success'))
    .catch((err) => console.error(err))
}

module.export = connectDB();
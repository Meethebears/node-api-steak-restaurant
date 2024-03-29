const Product = require('../Models/Products')

exports.read = async (req, res) => {
    try {
        const id = req.params.id
        const producted = await Product.find({ _id: id }).exec();
        res.send(producted)
    } catch (err) {
        console.log(err);
        res.status(500).send('Sever Error')
    }

}

exports.list = async (req, res) => {
    try {
        const producted = await Product.find({}).exec();
        res.send(producted)
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error')
    }
}

exports.create = async (req, res) => {
    try {
        console.log(req.body);
        const producted = await Product(req.body).save()
        res.send(producted)
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error')
    }
}

exports.update = async (req, res) => {
    try {
        const id = req.params.id
        const updated = await Product.findOneAndUpdate({ _id: id }, req.body, { new: true }).exec()
        res.send(updated)
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error')
    }
}

exports.remove = async (req, res) => {
    try {
        const id = req.params.id
        const removed = await Product.findOneAndDelete({_id:id}).exec()
        res.send(removed)
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error')
    }
}

exports.search = async (req, res) => {
    let data = await Product.find(
        {
            "$or":[
                {type:{$regex:req.params.key}}
            ]
        }
    )
    res.send(data);
}
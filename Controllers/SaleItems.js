const { forEach } = require('lodash');
const SaleItems = require('../Models/SaleItem')

exports.read = async (req, res) => {
    try {
        const id = req.params.id
        const saleItem = await SaleItems.find({ _id: id }).exec();
        res.send(saleItem)
    } catch (err) {
        console.log(err);
        res.status(500).send('Sever Error')
    }

}

exports.create = async (req, res) => {
    try {
        let sum = []
        const prices = req.body.order.map((item) => (item.price));
        const quantity = req.body.order.map((item) => (item.quantity));
        prices.forEach((element, index) => (
            sum.push(element * quantity[index])
        ))
        let total = sum.reduce((prev, curr) => prev + curr, 0);
        let order = req.body.order
        let data = {
            order,
            tablenumber : req.body.tablenumber,
            totalprice : total,
            payment: 'not paid'
          }
        const saleItem = await SaleItems(data).save()
        res.send(saleItem)

    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error')
    }
}

exports.list = async (req, res) => {
    try {
        const SaleItem = await SaleItems.find({}).exec();
        res.send(SaleItem)
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error')
    }
}

exports.update = async (req, res) => {
    try {
        const id = req.params.id
        const updated = await SaleItems.findOneAndUpdate({ _id: id }, req.body, { new: true }).exec()
        res.send(updated)
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error')
    }
}
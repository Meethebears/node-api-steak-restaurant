const { forEach } = require('lodash');
const SaleItems = require('../Models/SaleItem')

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
            totalprice : total
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